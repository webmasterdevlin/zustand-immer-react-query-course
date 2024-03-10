import React, { useEffect } from 'react';
import useFetchHeroes from '../features/heroes/hooks/useFetchHeroes';

export default function Dedupe() {
  const { data: response } = useFetchHeroes();
  useEffect(() => {
    console.log('Dedupe component rendered');
    // for deduping demo
    fetch('https://jsonplaceholder.typicode.com/todos/1');
  }, []);
  return <div>Dedupe {response?.data.length}</div>;
}
