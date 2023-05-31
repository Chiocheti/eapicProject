import { Routes as Switch, Route } from 'react-router-dom';

import Form from './formPage';
import Teste from './testePage';

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path='/' exact element={<Form />} />
        <Route path='/teste' exact element={<Teste />} />
      </Switch>
    </>
  )
}
