import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  RadioButton,
  SegmentedButtons,
  Text,
  useTheme,
} from 'react-native-paper';
import useGames from '../hooks/useGames';
import GameCard from '../components/GameCard';
import {
  type Platform,
  type Game,
  type Category,
  type SortBy,
} from '../interfaces/Game';
import CategoryChip from '../components/CategoryChip';

const ALL_CATEGORIES: Category[] = [
  'MMORPG',
  'SHOOTER',
  'STRATEGY',
  'ACTION',
  'RACING',
  'SPORTS',
  'MMO',
  'SURVIVAL',
  'SOCIAL',
];

function HomePage(): JSX.Element {
  const [page, setPage] = React.useState(1);
  const [gamesPerPage] = React.useState(5);
  const [columns] = React.useState(2);

  const [platform, setPlatform] = React.useState<Platform>('ALL');
  const [categories, setCategories] =
    React.useState<Category[]>(ALL_CATEGORIES);
  const [sortBy, setSortBy] = React.useState<SortBy>('popularity');

  const {status, data, error, isFetching} = useGames(sortBy);

  const theme = useTheme();

  function toggleCategory(category: Category): void {
    const index = categories.findIndex(c => c === category);

    if (index === -1) {
      const newCategories = [...categories];
      newCategories.push(category);

      setCategories(newCategories);
    } else {
      const newCategories = [...categories];
      newCategories.splice(index, 1);

      setCategories(newCategories);
    }
  }

  function take(): Game[] {
    if (data === undefined) {
      return [];
    }

    if (page * gamesPerPage > data.length) {
      return applyFilters();
    } else {
      return applyFilters().slice(0, page * gamesPerPage);
    }
  }

  function applyFilters(): Game[] {
    if (data === undefined) {
      return [];
    }

    return data.filter(d => checkPlatform(d) && checkGenre(d));
  }

  function checkPlatform(game: Game): boolean {
    if (platform === 'ALL') {
      return true;
    } else {
      return game.platform.toLowerCase().includes(platform.toLowerCase());
    }
  }

  function checkGenre(game: Game): boolean {
    return categories.find(c => c === game.genre.toUpperCase()) !== undefined;
  }

  return (
    <View
      style={{...style.container, backgroundColor: theme.colors.background}}>
      <Appbar.Header style={{paddingHorizontal: 0, marginHorizontal: 0}}>
        <Appbar.Content title="GameScout" />
      </Appbar.Header>

      <View style={{marginHorizontal: '5%'}}>
        <View style={style.platformContainer}>
          <View style={style.radio}>
            <Text>PC</Text>
            <RadioButton
              value="PC"
              status={platform === 'PC' ? 'checked' : 'unchecked'}
              onPress={() => setPlatform('PC')}
            />
          </View>
          <View style={style.radio}>
            <Text>BROWSER</Text>
            <RadioButton
              value="BROWSER"
              status={platform === 'BROWSER' ? 'checked' : 'unchecked'}
              onPress={() => setPlatform('BROWSER')}
            />
          </View>
          <View style={style.radio}>
            <Text>ALL</Text>
            <RadioButton
              value="ALL"
              status={platform === 'ALL' ? 'checked' : 'unchecked'}
              onPress={() => setPlatform('ALL')}
            />
          </View>
        </View>

        <View style={style.categoryContainer}>
          {ALL_CATEGORIES.map((category, i) => {
            return (
              <CategoryChip
                key={i}
                category={category}
                toggle={toggleCategory}
                mode={
                  categories.find(c => c === category) === undefined
                    ? 'outlined'
                    : 'flat'
                }
              />
            );
          })}
        </View>

        <View style={style.sortByContainer}>
          <SegmentedButtons
            value={sortBy}
            onValueChange={value => {
              if (
                value === 'release-date' ||
                value === 'popularity' ||
                value === 'alphabetical' ||
                value === 'relevance'
              ) {
                setSortBy(value);
              }
            }}
            buttons={[
              {value: 'release-date', label: 'Release Date'},
              {value: 'popularity', label: 'Popularity'},
              {value: 'alphabetical', label: 'Alphabetical'},
              {value: 'relevance', label: 'Relevance'},
            ]}
          />
        </View>

        {isFetching && <ActivityIndicator size={'large'} />}

        {data !== undefined && !isFetching && (
          <FlatList
            key={columns}
            numColumns={columns}
            contentContainerStyle={style.contentContainer}
            data={take()}
            renderItem={item => (
              <GameCard key={item.item.id.toString()} game={item.item} />
            )}
            keyExtractor={game => game.id.toString()}
            ListEmptyComponent={<Text>No Games Found To Display</Text>}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              if (page * gamesPerPage < data.length) {
                setPage(page + 1);
              }
            }}
            columnWrapperStyle={style.row}
          />
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    paddingBottom: '10%',
  },
  platformContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '1%',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 20,
    rowGap: 10,
    paddingTop: '1%',
    paddingBottom: '4%',
  },
  sortByContainer: {
    marginVertical: '2%',
    marginBottom: '4%',
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    rowGap: 25,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default HomePage;
