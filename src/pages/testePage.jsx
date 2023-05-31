import { useState } from 'react';
import XLSX from 'xlsx';
import { api } from '../services/api';

function Teste() {

  const [planilha, setPlanilha] = useState();
  const [cpfList, setCpfList] = useState();

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

      setPlanilha(jsonData);
    }

    reader.readAsArrayBuffer(file);
  }

  function salvarPlanilha() {
    let namePosition = '';
    let cpfPosition = '';

    for (let i = 0; i < planilha[0].length; i++) {
      console.log("Planilha ->");
      console.log(planilha[0][i]);

      if (planilha[0][i] === "Nome") {
        namePosition = i;
      }
      if (planilha[0][i] === "CPF") {
        cpfPosition = i;
      }
    }

    planilha.shift();

    planilha.forEach(async (line) => {
      const lineName = line[namePosition];
      const lineCpf = line[cpfPosition];
      try {
        const { data } = await api.post('/cpf', { name: lineName, cpf: lineCpf });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async function buscarNovaPlanilha() {
    try {
      const { data } = await api.get('/cpf');
      setCpfList(() => data);
      console.log(cpfList)
    } catch (error) {
      console.log(error);
    }
  }

  function salvarNovaPlanilha() {
    const data = [];
    data.push(['Nome', 'Cpf'])
    cpfList.forEach((line) => {
      data.push([line.name, line.cpf])
    });

    console.log(data);

    const wb = XLSX.utils.book_new();

    wb.Props = {
      Title: 'ListaEntrada',
      Subject: 'Teste',
      Author: 'Chiocheti',
      CreatedDate: new Date(),
    }

    wb.SheetNames.push('Lista 01');

    const ws = XLSX.utils.aoa_to_sheet(data);

    wb.Sheets['Lista 01'] = ws;

    XLSX.writeFile(wb, 'Planilha_Completa.xlsx', { bookType: 'xlsx', type: 'binary' });
  }

  return (
    <>
      <div>

        <button onClick={baixarPlanilha}>
          Baixar planilha
        </button>

        <button onClick={() => console.log(planilha[1])}>
          Mostrar Data
        </button>

        <button onClick={() => salvarPlanilha()}>
          Salvar Data
        </button>
      </div>

      <input type="file" onChange={() => lerPlanilha(event)} />

      <div>
        <button onClick={buscarNovaPlanilha}>
          Buscar nova planilha
        </button>
        <button onClick={salvarNovaPlanilha}>
          Salvar nova planilha
        </button>
      </div>
    </>
  )
}

export default Teste;
