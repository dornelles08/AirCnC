import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';
import './styles.css';

export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]
  )

  async function handleSubmit(event) {
    event.preventDefault();

    const user_id = localStorage.getItem('user');
    const data = new FormData();

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('price', price);
    data.append('techs', techs);

    await api.post('/spots', data, { 
      headers: { user_id } });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <lable
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input id="thumbnail" type="file" onChange={event => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="Select img" />
      </lable>

      <label htmlFor="company">Empresa *</label>
      <input type="text"
        id="company"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="company">Tecnologias *<span> (separadas por vírgulas)</span></label>
      <input type="text"
        id="techs"
        placeholder="Valor cobrado por dia?"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="company">Preço *<span> (em branco para Gratuito)</span></label>
      <input type="text"
        id="price"
        placeholder="Quais tecnologias usam?"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />

      <button className="btn">Cadastrar</button>
    </form>
  );
}