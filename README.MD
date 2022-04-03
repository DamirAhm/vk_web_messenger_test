# VK WebMessenger test work

## Used technologies

1. _Typescript_ because it's a standard
2. _React_, I decided to work with React because it's easier for me than writing pure JS and React for me is the most comfortable UI Framework(Library)
3. _Vite_ as bundler, just wanted to test it
4. _Axios_

## Problems occurred during development:

1. Layout of gif elements (columns of defined width/rows of defined height/elements with wrapping)
2. Finding a moment to load new gifs (track scroll/tack last element in a column/track last row)
3. Loading speed

## Decisions made:

1. I decided to put gifs in rows 100px high, because it prevents difficulties with tab navigation and makes it easier to make navigation on arrow keys
2. I used IntersectionObserver to track last row, firstly I thought about scroll tacking, that initially seemed ineffective, but also it turned out to be hard in development
3. Absence of list virtualization, I don't think if I could do it myself for now, and I think that using libraries like _react-virtualized_ makes no sense since every one could use it and i wanted to show **my** skills
4. Lack of animations since I don't know anything about them

## Conclusion:

I liked developing this test work very much, I tried to show everything I know and keep the code clean. I hope you'll appreciate my work. <3
