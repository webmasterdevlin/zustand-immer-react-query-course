import { useState } from 'react';

import { queryClient } from '../App';
import useFetchVillains from '../features/villains/hooks/useFetchVillains';
import useRemoveVillain from '../features/villains/hooks/useRemoveVillain';
import useAddVillain from '../features/villains/hooks/useAddVillain';
import { VillainModel } from '../features/villains/villain';
import UpdateUiLabel from '../components/UpdateUiLabel';
import TitleBar from '../components/TitleBar';
import FormSubmission from '../components/FormSubmission';

const VillainsPage = () => {
  const { data: response, status } = useFetchVillains();
  const { mutate: removeVillain } = useRemoveVillain();
  const { mutate: addVillain } = useAddVillain();
  /*local state*/
  const [counter, setCounter] = useState('0');

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: VillainModel[] }>('villains', input => ({
      data: input?.data?.filter(h => h.id !== id) as any,
    }));
  };

  if (status === 'error') return <p>Error :(</p>;

  return (
    <div>
      <TitleBar title={'Anti-Heroes Page'} />
      <FormSubmission handleMutate={addVillain} />
      <UpdateUiLabel />
      {status === 'loading' ? (
        <h2>Loading.. Please wait..</h2>
      ) : (
        response?.data?.map((v, i) => (
          <div key={v.id} className={'flex justify-between items-center'}>
            <h1>
              <span>{`${v.firstName} ${v.lastName} is ${v.knownAs}`}</span>
              {counter === v.id && <span> - marked</span>}
            </h1>
            <div>
              <button
                className={'btn btn--primary mx-0.5rem'}
                onClick={() => setCounter(v.id)}
              >
                Mark
              </button>
              <button
                className={'btn mx-0.5rem'}
                onClick={() => handleSoftDelete(v.id)}
              >
                Remove
              </button>
              <button
                className={'btn btn--secondary mx-0.5rem'}
                onClick={() => removeVillain(v.id)}
              >
                DELETE in DB
              </button>
            </div>
          </div>
        ))
      )}

      {response?.data?.length === 0 && status !== 'loading' && (
        <button
          className={'btn btn--primary mx-0.5rem'}
          onClick={() => queryClient.invalidateQueries('villains')}
        >
          Re-Fetch
        </button>
      )}
    </div>
  );
};

export default VillainsPage;
