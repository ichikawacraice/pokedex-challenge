import { useEffect, useState } from 'react';
import Text from '../../components/Text';
import api from '../../services/api';

function Dashboard() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    async function getItems() {
      const { data } = await api.get('/pokemon');

      const resp = await Promise.all(data.results.map((item) => api.get(item.url)));

      const format = resp.map((req) => req.data);
      setPokemon(format);
    }
    getItems();
  }, []);

  return (
    <div>
      <Text as="h1">Dashboard</Text>
      <Text>Procure por Pokémons por nome ou usando o seu número</Text>

      {
        pokemon.map((item) => (
          <div key={item.id}>
            {item.name}

            <img src={item.sprites.front_default} alt={item.name} />
          </div>
        ))
    }

    </div>
  );
}

export default Dashboard;
