import { Button, Box } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { useEffect } from 'react';

type Card = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

type FormattedData = {
  pages: {
    data: Card[];
  }
}

export default function Home(): JSX.Element {

  const fetchImages = async ({ pageParam = 0 }) => {
    const response = await api.get(`http://localhost:3000/api/images?after=${pageParam}`)
    const { data } = response

    return data
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    fetchImages
    ,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: (pages) => pages.after
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    return data?.pages.map(page => {
      return page.data.map(card => {
        return [{
          title: card.title,
          description: card.description,
          url: card.image,
          ts: card.ts,
          id: card.id
        }]
      })
    }).flat(2)
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return <Loading />
  }

  // TODO RENDER ERROR SCREEN
  if (isError) {
    return <Error />
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        {<CardList cards={formattedData} />}

        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            isLoading={isFetchingNextPage}
            loadingText='Carregando...'
            mt={10}
          >Carregar mais</Button>)
        }
      </Box>
    </>
  );
}
