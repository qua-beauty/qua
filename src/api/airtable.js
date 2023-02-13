import Airtable from 'airtable';

export const airtableBase = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY
}).base(import.meta.env.VITE_AIRTABLE_BASE);

const selectRecords = async (tableName) => {
  return await airtableBase(tableName).select({
    view: 'Grid view',
  }).all();
};

const createRecords = async (tableName, data) => {
  return await airtableBase(tableName).create(data);
};

export const airtableBaseQuery = async ({tableName, method, data}) => {
  try {
    let result;
    if(method === 'select') {
      result = await selectRecords(tableName);
    }

    if(method === 'create') {
      console.log(data);
      result = await createRecords(tableName, data)
    }

    return {data: result};
  } catch (error) {
    return {error};
  }
};



