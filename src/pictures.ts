const API_KEY = 'AIzaSyA6SFA1LGwRimgKm88YUVNOj2uSzX2d5JI';
const SPREADSHEET_ID = '11J5L6iGiMbZl7nTmfAx32hfPrhrkDFQAs3uKSW2vqxk';
const RANGE = 'Sheet1!A2:H';

function convertDriveUrlToThumbnail(url: string): string {
  if (!url) return '';

  const driveFileId = url.match(/[-\w]{25,}/);
  if (!driveFileId) return url;

  return `https://drive.google.com/thumbnail?id=${driveFileId[0]}`;
}

export async function fetchSpreadsheetData() {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`Error fetching data: ${response.status} - ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.values) {
      console.error('No data found in spreadsheet');
      throw new Error('No data found in spreadsheet');
    }

    return data.values;
  } catch (error) {
    console.error('Error fetching spreadsheet data:', error);
    return null;
  }
}

export async function loadMenuData() {
  try {
    const rows = await fetchSpreadsheetData();
    
    if (!rows) {
      console.log('Failed to fetch menu data');
      return [];
    }

    const menuItems = rows.map((row) => {
      // Debug: Log the entire row to verify structure
      console.log('Processing row:', row);
      
      // Safely extract price with multiple fallbacks
      let price = 0;
      const priceString = row[3] || row[4] || '0'; // Try column 3 first, then 4 as fallback
      
      try {
        // Remove any non-numeric characters except decimal point
        const cleanedPrice = priceString.toString().replace(/[^0-9.]/g, '');
        price = parseFloat(cleanedPrice);
        
        // If still NaN, try alternative parsing
        if (isNaN(price)) {
          price = parseFloat(priceString.replace(',', '.')) || 0;
        }
      } catch (e) {
        console.warn(`Failed to parse price from: ${priceString}`, e);
        price = 0;
      }

      return {
        id: parseInt(row[0]) || Date.now(), // Fallback to timestamp if no ID
        category: row[1]?.trim() || 'Uncategorized',
        name: row[2]?.trim() || 'Unnamed Item',
        price: price,
        image: convertDriveUrlToThumbnail(row[5] || ''),
        desc: row[6]?.trim() || '',
        combinations: row[7] 
          ? row[7].split(',')
              .map((comb) => comb.trim())
              .filter((comb) => comb.length > 0)
          : [],
      };
    });

    // Debug: Log final processed items
    console.log('Processed menu items:', menuItems);
    
    return menuItems;
  } catch (error) {
    console.error('Error loading menu data:', error);
    return [];
  }
}