function dummy(blogs) {
  return 1;
}

function totalLikes(blogs) {
  if(blogs.length === 0) return 0; 

  const total = blogs.reduce((totalLikes, currentItem) => totalLikes + currentItem.likes, 0);
  return total;
}

function favoriteBlog(blogs) {
  if(blogs.length === 0) return {}; 

  const favorite = blogs.reduce((prevItem, currItem) => prevItem.likes < currItem.likes ? currItem : prevItem, { likes: -1 })

  return favorite
} 

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
