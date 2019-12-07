import React, { useState, useEffect } from 'react'
import { View, StyleSheet, StatusBar, ToastAndroid } from 'react-native'

import CardList from '../components/CardList'
import BottomArea from '../components/BottomArea'

import rawCards from '../assets/exampleCards.json'

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#333',
    flex: 1,
  },
})

const Home = ({ navigation }) => {
  const [cards, setCards] = useState([])

  useEffect(() => {
    setCards(rawCards.cards)
  }, [])

  const removeCard = id => {
    const newCards = cards.filter(card => card.id !== id)

    setCards(newCards)
  }

  const finishCard = id => {
    removeCard(id)
    ToastAndroid.showWithGravity(
      'Você concluiu essa carta',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    )
  }

  const giveUpCard = id => {
    removeCard(id)
    ToastAndroid.showWithGravity(
      'Você desistiu dessa carta',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    )
  }

  const openCard = cardIndex => {
    navigation.push('CardDetailsScreen', {
      card: cards[cardIndex],
      finish: finishCard,
      giveUp: giveUpCard,
    })
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={'#333'} />
      <CardList
        cardsData={cards}
        onTapCard={openCard}
        onSwipeUp={() => {}}
        onSwipeDown={() => {}}
      />
      <BottomArea />
    </View>
  )
}

export default Home
