<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p class="body">
      Create it now is a website for makers of all kinds!
      Use Create It Now to develop to-do lists for projects you are working on.
      After the completion of each to-do list item, you may write a journal entry (complete with a photo) to track your progress throughout the project.
      When the project is complete, you will have a complete journal that documents the progress of the work done.
    </p>
    <br />
    <p class="body">
      Here, makers organize their thoughts relevant to their creations and reflect upon the journey they have taken to meet their goals.
    </p>
    <br />
    <p class="body">
      Have fun creating! 
    </p>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p.body {
  margin: 0px 150px;
  font-size: 20px;
}
</style>
