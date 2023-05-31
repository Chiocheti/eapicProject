import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';

import { api } from "../services/api"
import CompErrors from './component/error';

import "../css/form.css"

const schema = Yup.object({
  cpf: Yup.string().required('Digite o CPF'),
  phone: Yup.string().required('Digite o TELEFONE'),
  show_id01: Yup.string().required('Selecione um SHOW'),
  name01: Yup.string().required('Digite o NOME'),
  rg01: Yup.string().required('Digite o RG'),
  show_id02: Yup.string().required('Selecione um SHOW'),
  name02: Yup.string().required('Digite o NOME'),
  rg02: Yup.string().required('Digite o RG'),
})

export default function Form() {

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState(1);
  const [statusMessage, setStatusMessage] = useState();
  const [statusShow1, setStatusShow1] = useState({
    message: '',
    status: false,
  });
  const [statusShow2, setStatusShow2] = useState({
    message: '',
    status: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get('/show/open');
        setShows(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValues,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  if (loading) {
    return (
      <p>Loading...</p>
    )
  }

  function convertDate(date) {
    let tomorrowDay = new Date(date).setHours(+24);
    let day = new Date(tomorrowDay)

    const week = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const weekDay = day.getDay();

    const dd = String(day.getDate()).padStart(2, '0');
    const mm = String(day.getMonth() + 1).padStart(2, '0');

    return (`Dia ${dd}/${mm} - ${week[weekDay]}`);
  }

  async function saveClient(client) {
    try {
      const { data } = await api.post('/client', client);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function validadeClient(data) {
    setStatusMessage();
    setStatusShow1({
      message: '',
      status: false,
    });
    setStatusShow2({
      message: '',
      status: false,
    });

    console.log(data);

    const { cpf, phone, show_id01, name01, rg01, show_id02, name02, rg02 } = data;

    let client = { cpf, phone, show_id: show_id01, name: name01, rg: rg01 }

    console.log(client);

    let response = '';

    if (!statusShow1.status) {
      response = await saveClient(client);
    }
    console.log(response);

    if (response.status === 'not_found' || response.status === 'expired') {
      setStatusMessage(response.message);
    }

    if (response.status === 'blocked') {
      setStatusShow1({
        message: response.message,
        status: false,
      });
    }

    if (response.status === 'success') {
      setStatusShow1({
        message: response.message,
        status: true,
      });
    }

    client = { cpf, phone, show_id: show_id02, name: name02, rg: rg02 }

    console.log(client);

    if (!statusShow2.status) {
      response = await saveClient(client);
    }

    console.log(response);

    if (response.status === 'blocked') {
      setStatusShow2({
        message: response.message,
        status: false,
      });
    }

    if (response.status === 'success') {
      setStatusShow2({
        message: response.message,
        status: true,
      });
    }

    // try {
    //   const { data } = await api.post('/client', client);

    //   console.log('Response: ');
    //   console.log(data);

    //   if (data.status === 'success') {
    //     setPosition(() => position + 1);
    //     reset({
    //       show_id: '',
    //       name: '',
    //       rg: '',
    //     })
    //   }

    //   if (data.status === 'expired') {
    //     reset({
    //       cpf: '',
    //       show_id: '',
    //       name: '',
    //       rg: '',
    //     })
    //   }

    //   setStatusMessage(data.message)
    // } catch (error) {
    //   console.log(error);
    // }
  }

  if (position === 3) {
    navigate('/success')
  }

  return (
    <div className="box">
      <form action="">


        <fieldset>

          <legend><b>Entradas para a EAPIC 2023</b></legend>

          <br />

          {
            statusMessage ? <h3 className='title'> {statusMessage} </h3> : null
          }

          <div className="inputBox">
            <InputMask
              mask="999.999.999-99"
              type="text"
              className="inputUser"
              required
              {...register('cpf')}
            />
            <label
              htmlFor="CPF"
              className="labelInput"
            >
              CPF do Servidor Público:
            </label>

            <CompErrors error={errors?.cpf} />


          </div>

          <div className="inputBox">
            <InputMask
              mask="(99)999999999"
              type="text"
              className="inputUser"
              required
              {...register('phone')}
            />
            <label
              htmlFor="Celular"
              className="labelInput"
            >
              Telefone Celular:
            </label>
            <CompErrors error={errors?.phone} />

          </div>

          <br />

          {
            statusShow1.message ? <h3 className='title'> {statusShow1.message} </h3> : null
          }

          <div>
            <select
              defaultValue={''}
              {...register('show_id01')}
              id="shows"
            >
              <option
                value=""
                disabled
              >
                Selecione uma Opção
              </option>
              {
                shows.map((show) => (
                  <option
                    key={show.id}
                    value={show.id}
                  >
                    {`${convertDate(show.showDay)} - ${show.showName}`}
                  </option>
                ))
              }
            </select>
            <CompErrors error={errors?.show_id01} />

          </div>

          <br />

          <div className="inputBox">
            <input
              type="text"
              className="inputUser"
              required
              {...register('name01')}
            />
            <label
              htmlFor="nome1"
              className="labelInput"
            >
              Ingresso 1 em nome de:
            </label>
            <CompErrors error={errors?.name01} />

          </div>

          <div className="inputBox">
            <InputMask
              mask="99.999.999-9"
              type="text"
              className="inputUser"
              required
              {...register('rg01')}
            />
            <label
              htmlFor="rg1"
              className="labelInput"
            >
              RG:
            </label>
            <CompErrors error={errors?.rg01} />

          </div>

          <br />

          {
            statusShow2.message ? <h3 className='title'> {statusShow2.message} </h3> : null
          }

          <div>
            <select
              defaultValue={''}
              id="shows"
              {...register('show_id02')}
            >
              <option
                value=""
                disabled
              >
                Selecione uma Opção
              </option>
              {
                shows.map((show) => (
                  <option
                    key={show.id}
                    value={show.id}
                  >
                    {`${convertDate(show.showDay)} - ${show.showName}`}
                  </option>
                ))
              }
            </select>

            <CompErrors error={errors?.show_id02} />

          </div>

          <br />

          <div className="inputBox">
            <input
              type="text"
              className="inputUser"
              required
              {...register('name02')}
            />
            <label
              htmlFor="nome2"
              className="labelInput"
            >
              Ingresso 2 em nome de:
            </label>

            <CompErrors error={errors?.name02} />

          </div>

          <div className="inputBox">
            <InputMask
              mask="99.999.999-9"
              type="text"
              required
              className="inputUser"
              {...register('rg02')}
            />
            <label
              htmlFor="rg2"
              className="labelInput"
            >
              RG:
            </label>
            <CompErrors error={errors?.rg02} />

          </div>

          <br />

          <div>
            <button
              id="submit"
              onClick={handleSubmit(validadeClient)}
            >
              Salvar
            </button>
          </div>

        </fieldset>
      </form>

    </div >
  )
}
