import { useState } from 'react';
import './App.css'
import XLSX from 'xlsx';
import { api } from './services/api';

function App() {

  const [data, setData] = useState();

  function baixarPlanilha() {
    const wb = XLSX.utils.book_new();

    wb.Props = {
      Title: 'Relatório',
      Subject: 'Teste',
      Author: 'Chiocheti',
      CreatedDate: new Date(),
    };

    wb.SheetNames.push('Relatório 1');

    const data = [
      ['Nome', 'CPF'],
      ['Caio', '11111'],
      ['Gabriel', '22222'],
      ['Marcelo', '33333'],
      ['Samuel', '44444'],
      ['Zé', '55555'],
      ['Urubu', '66666'],
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);

    wb.Sheets['Relatório 1'] = ws;

    XLSX.writeFile(wb, 'teste.xlsx', { bookType: 'xlsx', type: 'binary' });
  }

  function lerPlanilha(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);

      const workbook = XLSX.read(data, { type: 'array' });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      console.log(jsonData);

      setData(jsonData);
    }

    reader.readAsArrayBuffer(file);
  }

  function salvarPlanilha() {
    let namePosition = '';
    let cpfPosition = '';

    for (let i = 0; i < data[0].length; i++) {
      console.log("Data ->");
      console.log(data[0][i]);

      if (data[0][i] === "Nome") {
        namePosition = i;
      }
      if (data[0][i] === "CPF") {
        cpfPosition = i;
      }
    }

    data.forEach(async (element) => {
      const elementName = element[namePosition];
      const elementCpf = element[cpfPosition];
      try {
        await api.post('/cpf', { name: elementName, cpf: elementCpf });
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <>
      <button onClick={baixarPlanilha}>
        Baixar planilha
      </button>

      <button onClick={() => console.log(data[1])}>
        Mostrar Data
      </button>

      <button onClick={() => salvarPlanilha()}>
        Salvar Data
      </button>

      <input type="file" onChange={() => lerPlanilha(event)} />
    </>
  )
}

export default App
