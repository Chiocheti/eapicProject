import { useState } from 'react';
import './App.css'
import XLSX from 'xlsx';

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
      ['Titulo 1', 'Titulo 2'],
      ['1-1', '1-2'],
      ['2-1', '2-2'],
      ['3-1', '3-2'],
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

  return (
    <>
      <button onClick={baixarPlanilha}>
        Baixar planilha
      </button>

      <button onClick={() => console.log(data[1])}>
        Mostrar Data
      </button>

      <input type="file" onChange={() => lerPlanilha(event)} />
    </>
  )
}

export default App
