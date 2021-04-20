<template>
    <tr>
        <td>{{task.name}}</td>
        <td>{{task.deadline}}</td>
        <td>{{task.description}}</td>
        <td><router-link :to="{name:'SingleTask', params:{id:this.id}}" id="todosSingle">More About Task</router-link></td>
    </tr>
</template>

<script> 

export default {
    name: "task",
    props: ["id","task","project_id"],
}
</script>
<style scoped>
    td {
        padding: 1em;
        color: black;
    }
</style>