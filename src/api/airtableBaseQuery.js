import Airtable from 'airtable';

export const airtableBase = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY
}).base(import.meta.env.VITE_AIRTABLE_BASE);

export const airtableBaseQuery = async ({tableName, method, data}) => {
  try {
    let result;
    if (method === 'select') {
      result = await selectRecords(tableName);
    }

    if (method === 'create') {
      result = await createRecords(tableName, data);
    }

    if (method === 'retrieve') {
      result = await retrieveRecord(tableName, data);
    }

    return {data: result};
  } catch (error) {
    return {error};
  }
};


async function selectRecords(tableName) {
  return await airtableBase(tableName).select({
    view: 'Grid view',
    filterByFormula: `NOT({Disabled})`
  }).all();
}

async function createRecords(tableName, data) {
  return await airtableBase(tableName).create(data);
}


async function retrieveRecord(tableName, data) {
  return await airtableBase(tableName).select({
    maxRecords: 1,
    filterByFormula: `{${data.key}} = ${data.value}`
  }).firstPage();
}

