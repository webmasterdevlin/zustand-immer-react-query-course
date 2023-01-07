import { queryClient } from '../App';
import useFetchHeroes from '../features/heroes/hooks/useFetchHeroes';
import useRemoveHero from '../features/heroes/hooks/useRemoveHero';
import useAddHero from '../features/heroes/hooks/useAddHero';
import { HeroModel } from '../features/heroes/hero';
import { Button, Flex, Title } from '@mantine/core';
import { useState } from 'react';
import UpdateUiLabel from '../components/UpdateUiLabel';
import TitleBar from '../components/TitleBar';
import FormSubmission from '../components/FormSubmission';

const HeroesPage = () => {
    const { data: response, status } = useFetchHeroes();
    const { mutate: removeHero } = useRemoveHero();
    const { mutate: addHero } = useAddHero();
    /*local state*/
    const [counter, setCounter] = useState('0');

    const handleSoftDelete = (id: string) => {
        queryClient.setQueryData<{ data: HeroModel[] }>('heroes', input => ({
            data: input?.data?.filter(h => h.id !== id) as any,
        }));
    };

    if (status === 'error') return <p>Error :(</p>;

    return (
        <div>
            <TitleBar title={'Super Heroes Page'} />
    <FormSubmission handleMutate={addHero} />
    <UpdateUiLabel />
    {status === 'loading' ? (
        <Title order={2}>Loading.. Please wait..</Title>
) : (
        response?.data?.map((h, i) => (
            <Flex
                key={h.id}
    display={'flex'}
    justify={'space-between'}
    align="center"
        >
        <Title>
            <span>{`${h.firstName} ${h.lastName} is ${h.knownAs}`}</span>
    {counter === h.id && <span> - marked</span>}
    </Title>
    <div>
    <Button
        m={'0 0.5rem'}
        color="indigo"
        variant="subtle"
        onClick={() => setCounter(h.id)}
    >
        Mark
        </Button>
        <Button
        m={'0 0.5rem'}
        color="pink"
        variant="filled"
        onClick={() => handleSoftDelete(h.id)}
    >
        Remove
        </Button>
        <Button
        m={'0 0.5rem'}
        color="pink"
        variant="outline"
        onClick={() => removeHero(h.id)}
    >
        DELETE in DB
        </Button>
        </div>
        </Flex>
    ))
    )}

    {response?.data?.length === 0 && status !== 'loading' && (
        <Button
            color="violet"
        variant="filled"
        onClick={() => queryClient.invalidateQueries('heroes')}
    >
        Re-Fetch
        </Button>
    )}
    </div>
);

    // return (
    //   <div>
    //     <TitleBar title={'Super Heroes Page'} />
    //     <FormSubmission handleMutate={addHero} />
    //     <UpdateUiLabel />
    //     <>
    //       {status === 'loading' ? (
    //         <Typography data-testid={'loading'} variant={'h2'}>
    //           Loading.. Please wait..
    //         </Typography>
    //       ) : (
    //         response?.data?.map(h => (
    //           <Box
    //             key={h.id}
    //             role={'card'}
    //             mb={2}
    //             display={'flex'}
    //             flexDirection={smallScreen ? 'column' : 'row'}
    //             justifyContent={'space-between'}
    //             data-testid={'card'}
    //           >
    //             <Typography>
    //               <span>{`${h.firstName} ${h.lastName} is ${h.knownAs}`}</span>
    //               {counter === h.id && <span> - marked</span>}
    //             </Typography>
    //             <div>
    //               <Button
    //                 className={classes.button}
    //                 onClick={() => setCounter(h.id)}
    //                 variant={'contained'}
    //                 data-testid={'mark-button'}
    //               >
    //                 Mark
    //               </Button>{' '}
    //               <Button
    //                 className={classes.button}
    //                 variant={'contained'}
    //                 color={'secondary'}
    //                 onClick={() => handleSoftDelete(h.id)}
    //                 data-testid={'remove-button'}
    //               >
    //                 Remove
    //               </Button>{' '}
    //               <Button
    //                 className={classes.button}
    //                 variant={'outlined'}
    //                 color={'secondary'}
    //                 onClick={() => removeHero(h.id)}
    //                 data-testid={'delete-button'}
    //               >
    //                 DELETE in DB
    //               </Button>
    //             </div>
    //           </Box>
    //         ))
    //       )}
    //     </>
    //     {response?.data?.length === 0 && status !== 'loading' && (
    //       <Button
    //         data-testid={'refetch-button'}
    //         className={classes.button}
    //         variant={'contained'}
    //         color={'primary'}
    //         onClick={() => queryClient.invalidateQueries('heroes')}
    //       >
    //         Re-fetch
    //       </Button>
    //     )}
    //   </div>
    // );
};

    export default HeroesPage;
