const getColorScheme = (statName: string) => {
   switch (statName.toLowerCase()) {
     case 'hp':
       return 'green';
     case 'attack':
       return 'red';
     case 'special attack':
       return 'purple';
     case 'defense':
       return 'blue';
     case 'special defense':
       return 'yellow';
     case 'speed':
       return 'orange';
     default:
       return 'gray';
   }
 };

export {getColorScheme};