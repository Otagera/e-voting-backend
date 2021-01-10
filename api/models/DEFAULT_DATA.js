const companies = [
	{
		name: 'My Home',
		img: 'myHomeImg',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ullam! Nesciunt illum minima illo velit harum, in! Corrupti autem officiis, beatae ipsa minima sequi ab at, ducimus consequuntur incidunt deleniti?',
		socials: [
      {
        social: 'fb',
        link: 'https://www.facebook.com/MyHome'
      },
      {
  			social: 'twitter',
        link: 'https://www.twitter.com/MyHome'
      },
			{
        social: 'insta',
        link: 'https://www.instagram.com/MyHome'
      },
			{
        social: 'website',
        link: 'https://www.myhome.com'
      }
    ],
    fakeId: 1
  },
  {
    name: 'Insure',
    img: 'insureImg',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ullam! Nesciunt illum minima illo velit harum, in! Corrupti autem officiis, beatae ipsa minima sequi ab at, ducimus consequuntur incidunt deleniti?',
    socials: [
      {
        social: 'fb',
        link: 'https://www.facebook.com/Insure'
      },
      {
        social: 'twitter',
        link: 'https://www.twitter.com/Insure'
      },
      {
        social: 'insta',
        link: 'https://www.instagram.com/Insure'
      },
      {
        social: 'website',
        link: 'https://www.insure.com'
      }
    ],
    fakeId: 2
  },
  {
    name: 'Manage',
    img: 'manageImg',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ullam! Nesciunt illum minima illo velit harum, in! Corrupti autem officiis, beatae ipsa minima sequi ab at, ducimus consequuntur incidunt deleniti?',
    socials: [
      {
        social: 'fb',
        link: 'https://www.facebook.com/manage'
      },
      {
        social: 'twitter',
        link: 'https://www.twitter.com/manage'
      },
      {
        social: 'insta',
        link: 'https://www.instagram.com/manage'
      },
      {
        social: 'website',
        link: 'https://www.manage.com'
      }
    ],
    fakeId: 3
  },
  {
    name: 'FaceIt',
    img: 'faceItImg',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ullam! Nesciunt illum minima illo velit harum, in! Corrupti autem officiis, beatae ipsa minima sequi ab at, ducimus consequuntur incidunt deleniti?',
    socials: [
      {
        social: 'fb',
        link: 'https://www.facebook.com/faceit'
      },
      {
        social: 'twitter',
        link: 'https://www.twitter.com/faceit'
      },
      {
        social: 'insta',
        link: 'https://www.instagram.com/faceit'
      },
      {
        social: 'website',
        link: 'https://www.faceit.com'
      }
    ],
    fakeId: 4
  }
];
const competitions = [
  {
    name: 'The 1st Annual Most Sly Competition',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ullam! Nesciunt illum minima illo velit harum, in! Corrupti autem officiis, beatae ipsa minima sequi ab at, ducimus consequuntur incidunt deleniti?'
  },
  {
    name: 'The 2nd Annual Most Sly Competition',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ullam! Nesciunt illum minima illo velit harum, in! Corrupti autem officiis, beatae ipsa minima sequi ab at, ducimus consequuntur incidunt deleniti?'
  },
  {
    name: 'The 3rd Annual Most Sly Competition',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ullam! Nesciunt illum minima illo velit harum, in! Corrupti autem officiis, beatae ipsa minima sequi ab at, ducimus consequuntur incidunt deleniti?'
  },
  {
    name: 'The 4th Annual Most Sly Competition',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ullam! Nesciunt illum minima illo velit harum, in! Corrupti autem officiis, beatae ipsa minima sequi ab at, ducimus consequuntur incidunt deleniti?'
  },
  {
    name: 'The 5th Annual Most Sly Competition',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ullam! Nesciunt illum minima illo velit harum, in! Corrupti autem officiis, beatae ipsa minima sequi ab at, ducimus consequuntur incidunt deleniti?'
  },
  {
    name: 'The 6th Annual Most Sly Competition',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ullam! Nesciunt illum minima illo velit harum, in! Corrupti autem officiis, beatae ipsa minima sequi ab at, ducimus consequuntur incidunt deleniti?'
  }
];
const categories = [
  {
    name: 'Males',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ullam! Nesciunt illum minima illo velit harum, in! Corrupti autem officiis, beatae ipsa minima sequi ab at, ducimus consequuntur incidunt deleniti?',
    fakeId: 1
  },
  {
    name: 'Females',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ullam! Nesciunt illum minima illo velit harum, in! Corrupti autem officiis, beatae ipsa minima sequi ab at, ducimus consequuntur incidunt deleniti?',
    fakeId: 2
  },
  {
    name: 'Young',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ullam! Nesciunt illum minima illo velit harum, in! Corrupti autem officiis, beatae ipsa minima sequi ab at, ducimus consequuntur incidunt deleniti?',
    fakeId: 3
  },
  {
    name: 'Old',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ullam! Nesciunt illum minima illo velit harum, in! Corrupti autem officiis, beatae ipsa minima sequi ab at, ducimus consequuntur incidunt deleniti?',
    fakeId: 4
  }
];
const contestants = [
  {
    name: 'Agera',
    img: 'ageraImg',
    quote: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis illum amet id, consequatur aliquid eligendi nihil excepturi qui praesentium molestiae quisquam assumenda rerum eaque officiis sunt hic quod ipsa fugit!',
    fakeId: 1,
    socials: [
      {
        social: 'fb',
        link: 'https://www.facebook.com/agera'
      },
      {
        social: 'twitter',
        link: 'https://www.twitter.com/agera'
      },
      {
        social: 'insta',
        link: 'https://www.instagram.com/agera'
      }
    ]
  },
  {
    name: 'MI',
    img: 'miImg',
    quote: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis illum amet id, consequatur aliquid eligendi nihil excepturi qui praesentium molestiae quisquam assumenda rerum eaque officiis sunt hic quod ipsa fugit!',
    fakeId: 2,
    socials: [
      {
        social: 'fb',
        link: 'https://www.facebook.com/mi'
      },
      {
        social: 'twitter',
        link: 'https://www.twitter.com/mi'
      },
      {
        social: 'insta',
        link: 'https://www.instagram.com/mi'
      }
    ]
  },
  {
    name: 'Baby',
    img: 'babyImg',
    quote: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis illum amet id, consequatur aliquid eligendi nihil excepturi qui praesentium molestiae quisquam assumenda rerum eaque officiis sunt hic quod ipsa fugit!',
    fakeId: 3,
    socials: [
      {
        social: 'fb',
        link: 'https://www.facebook.com/baby'
      },
      {
        social: 'twitter',
        link: 'https://www.twitter.com/baby'
      },
      {
        social: 'insta',
        link: 'https://www.instagram.com/baby'
      }
    ]
  },
  {
    name: 'Ye',
    img: 'yeImg',
    quote: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis illum amet id, consequatur aliquid eligendi nihil excepturi qui praesentium molestiae quisquam assumenda rerum eaque officiis sunt hic quod ipsa fugit!',
    fakeId: 4,
    socials: [
      {
        social: 'fb',
        link: 'https://www.facebook.com/ye'
      },
      {
        social: 'twitter',
        link: 'https://www.twitter.com/ye'
      },
      {
        social: 'insta',
        link: 'https://www.instagram.com/ye'
      }
    ]
  },
  {
    name: 'Ali the Great',
    img: 'aliImg',
    quote: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis illum amet id, consequatur aliquid eligendi nihil excepturi qui praesentium molestiae quisquam assumenda rerum eaque officiis sunt hic quod ipsa fugit!',
    fakeId: 5,
    socials: [
      {
        social: 'fb',
        link: 'https://www.facebook.com/ali_d_great'
      },
      {
        social: 'twitter',
        link: 'https://www.twitter.com/ali_d_great'
      },
      {
        social: 'insta',
        link: 'https://www.instagram.com/ali_d_great'
      }
    ]
  }
];


function generate(max, theCount) {
    let r = [];
    let currsum = 0;
    for(let i = 0; i < theCount-1; i++){
      r[i] = randomBetween(1, max-(theCount-i-1)-currsum);
      currsum += r[i];
    }
    r[theCount-1] = max - currsum;
    return r;
}
function randomBetween(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}
for(let i = 0; i < categories.length; i++){
  let tempContestants = [ ...contestants ];
  let tempContestantsWithVotes = [];
  let votes = generate(100, tempContestants.length);
  for (let i = 0; i < tempContestants.length; i++){
    tempContestantsWithVotes.push(
      {
        contestantVotes: votes.splice(Math.floor(Math.random()*votes.length), 1)[0]
      }
    );
  }

  categories[i].contestants = tempContestantsWithVotes;
}

for(let i = 0; i < competitions.length; i++){
  competitions[i].deadline = (new Date().getTime()) + (86400000 * Math.floor(Math.random()*30));
}

module.exports = {
  companies,
  competitions,
  categories,
  contestants
};