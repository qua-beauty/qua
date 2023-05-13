export const airtableFetch = async (tableName, formula) => {
  try {
    const filterByFormula = encodeURIComponent(formula);
    const url = `https://api.airtable.com/v0/${Deno.env.get('AIRTABLE_BASE')}/${tableName}?filterByFormula=${filterByFormula}`;

    return await fetch(url, {
      headers: {
        'Authorization': `Bearer ${Deno.env.get('AIRTABLE_API_KEY')}`
      },
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        return data.records;
      })
  } catch (e) {
    console.log(e);
    return undefined;
  }
};