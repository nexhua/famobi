import React from 'react';
import {type Game} from '../interfaces/Game';
import {Image, StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

interface GameCardsProps {
  game: Game;
}

function GameCard(props: GameCardsProps): JSX.Element {
  const theme = useTheme();

  return (
    <View
      style={{...style.container, backgroundColor: theme.colors.onBackground}}>
      <Image style={style.image} source={{uri: props.game.thumbnail}} />

      <View style={style.info}>
        <Text variant="titleMedium" style={{color: theme.colors.background}}>
          {props.game.title}
        </Text>
        <Text style={{color: theme.colors.background}}>{props.game.genre}</Text>
        <Text style={{color: theme.colors.background}}>
          {props.game.platform}
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '48%',
    borderRadius: 10,
    paddingBottom: '5%',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain',
  },
  info: {
    marginHorizontal: '3%',
    marginTop: '2%',
  },
});

export default GameCard;
