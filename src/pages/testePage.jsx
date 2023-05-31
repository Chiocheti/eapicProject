import { useState } from 'react';
import XLSX from 'xlsx';
import { api } from '../services/api';

function Teste() {

  const [planilha, setPlanilha] = useState();

  function lerPlanilha(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);

      const workbook = XLSX.read(data, { type: 'array' });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      console.log(jsonData);

      setPlanilha(jsonData);
    }

    reader.readAsArrayBuffer(file);
  }

  function salvarPlanilha() {

    planilha.shift();

    planilha.forEach(async (cpf) => {
      try {
        const { data } = await api.post('/cpf', { cpf: cpf[0] });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async function findClients(id) {
    const show = id;
    const { data } = await api.post('/client/show', { show });

    return data;
  }

  function gerarArray(clientList) {
    let array = [['Nome', 'Rg']];
    clientList.forEach((client) => {

      array.push([client.name, client.rg])
    });
    return array;
  }

  async function writeWorkBook(sheetData) {

    let workbook = XLSX.utils.book_new();

    await sheetData.forEach((sheet) => {
      const worksheet = XLSX.utils.aoa_to_sheet(sheet.data);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name);
    });

    XLSX.writeFile(workbook, 'Relatório.xlsx', { bookType: 'xlsx', type: 'binary' });
  }

  async function gerarRelatorio() {
    let { data } = await api.get('/show');

    let list = [];

    await data.forEach(async (element) => {
      let clientList = await findClients(element.id);

      let array = gerarArray(clientList);

      list.push({
        data: array,
        name: element.showName,
      });

      if (list.length === 6) {
        writeWorkBook(list);
      }
    });
  }

  return (
    <>
      <div>
        <input type="file" onChange={() => lerPlanilha(event)} />
      </div>

      <div>
        <button onClick={() => salvarPlanilha()}>
          Salvar Cpfs
        </button>
      </div>

      <div>
        <button onClick={gerarRelatorio}>
          Gerar Relatório
        </button>
      </div>
    </>
  )
}

export default Teste;
