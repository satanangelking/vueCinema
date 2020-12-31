<template>
    <div>
        <mt-index-list>
  <mt-index-section index="A">
    <mt-cell title="Aaron"></mt-cell>
    <mt-cell title="Alden"></mt-cell>
    <mt-cell title="Austin"></mt-cell>
  </mt-index-section>
  <mt-index-section index="B">
    <mt-cell title="Baldwin"></mt-cell>
    <mt-cell title="Braden"></mt-cell>
  </mt-index-section>
  ...
  <mt-index-section index="Z">
    <mt-cell title="Zack"></mt-cell>
    <mt-cell title="Zane"></mt-cell>
  </mt-index-section>
</mt-index-list>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    mounted(){
        axios({
            url:`https://m.maizuo.com/gateway?k=4338919`,
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1607088511970847292489729"}',
                'X-Host': 'mall.film-ticket.city.list'
            }
        }).then(res=>{
                console.log(res.data)
            })
    }
}
</script>
