<template>
    <div class="col-md-12">
        <h2>Congratulation</h2>
        <p>Payment Sucessfull</p>
        <p>ORDER ID: {{order_id}}</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            order_id:''
        }
    },
    created(){
        this.order_id = this.$route.params.id
    }
}
</script>