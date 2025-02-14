import React, { useState, useEffect } from 'react';
import './connections.css';

type Category = {
  name: string;
  words: string[];
  displayName: string;
  className: string;
};

const CATEGORIES: Category[] = [
  {
    name: 'trips',
    words: ['Scotland', 'Hawaii', 'Montreal', 'New Hampshire'],
    displayName: '2024 Trips',
    className: 'trips'
  },
  {
    name: 'meals',
    words: ['Steak', 'Zucchini lasagna', 'Chili', 'Potatoes'],
    displayName: 'Meals you\'ll never have again ha ha ha !',
    className: 'meals'
  },
  {
    name: 'jenny',
    words: ['Cute', 'Silly', 'Sweet', 'Loving'],
    displayName: 'Jenny Attributes',
    className: 'jenny'
  },
  {
    name: 'games',
    words: ['Goose', 'Train', 'Mango Muncher', 'Groups'],
    displayName: 'Main Thing In Games',
    className: 'games'
  }
];

const Page = () => {
  const [words, setWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [solvedCategories, setSolvedCategories] = useState<string[]>([]);
  const [wrongGuess, setWrongGuess] = useState(false);

  useEffect(() => {
    // Shuffle words at launch
    const allWords = CATEGORIES.flatMap(cat => cat.words);
    setWords(allWords.sort(() => Math.random() - 0.5));
  }, []);

  const toggleWord = (word: string) => {
    setSelectedWords(prev => {
      if (prev.includes(word)) {
        return prev.filter(w => w !== word);
      }
      if (prev.length < 4) {
        return [...prev, word];
      }
      return prev;
    });
  };

  useEffect(() => {
    if (selectedWords.length === 4) {
      // Check if selected words form a category
      const matchingCategory = CATEGORIES.find(category =>
        category.words.every(word => selectedWords.includes(word))
      );

      if (matchingCategory && !solvedCategories.includes(matchingCategory.name)) {
        setSolvedCategories(prev => [...prev, matchingCategory.name]);
        setSelectedWords([]);
      } else if (matchingCategory === undefined) {
        setWrongGuess(true);
        setTimeout(() => {
          setWrongGuess(false);
          setSelectedWords([]);
        }, 1000);
      }
    }
  }, [selectedWords]);

  // Filter and shuffle remaining words whenever solved categories change
  const remainingWords = React.useMemo(() => {
    const filtered = words.filter(word => 
      !solvedCategories.some(cat => 
        CATEGORIES.find(c => c.name === cat)?.words.includes(word)
      )
    );
    return [...filtered].sort(() => Math.random() - 0.5);
  }, [words, solvedCategories]);

  return (
    <div className="ConnectionsPage">
      <div className="game-content">
        <h1 className="title">Dummy's Connections</h1>
        
        <div className="game-area">
          <div className="solved-categories">
            {solvedCategories.map(catName => {
              const category = CATEGORIES.find(c => c.name === catName);
              return category && (
                <div key={catName} className={`solved-row ${category.className}`}>
                  <div className="solved-category-name">{category.displayName}</div>
                  <div className="solved-words">{category.words.join(', ')}</div>
                </div>
              );
            })}
          </div>

          <div className="grid">
            {remainingWords.map((word, i) => (
              <div key={i} className="word-container">
                <button
                  className={`word ${selectedWords.includes(word) ? 'selected' : ''} 
                           ${wrongGuess && selectedWords.includes(word) ? 'wrong' : ''}`}
                  onClick={() => toggleWord(word)}
                >
                  {word}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;