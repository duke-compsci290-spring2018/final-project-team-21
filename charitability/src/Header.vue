<template>
<div id="Header">
    <h1>Charitability</h1>
    <div id="navbar">
        <div id="leftnav">
            <a id="home">Home</a>
            <a id="charities">Charities</a>
            <a id="progress">Progress</a>
        </div>
        <div id="rightnav">
            <a id="profile"><i class="fa fa-user"></i> Profile</a>
            <a id="login"><i class="fa fa-sign-in"></i> Login</a>
            <a id="logout"><i class="fa fa-sign-out"></i> Logout</a>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
    }
</script>

<style>
    h1{
        font-size: 50px;
    }
    #home{
        cursor: pointer;
    }
    #profile{
        padding-top:10px;
        padding-bottom:10px;
        padding-left:10px;
        padding-right:10px;
        margin-right:50px;
        cursor: pointer;
    }
    #profile:hover{
        background-color: #f9f9eb;
        cursor: pointer;
    }
    #charities{
        margin-left:50px;
        cursor: pointer;
    }
    #progress{
        margin-left:50px;
        cursor: pointer;
    }
    #login{
        margin-right:50px;
        cursor: pointer;
    }
    #logout{
        cursor: pointer;
    }
    #navbar {
        background-color:beige;
        overflow: hidden;
        padding-top:5px;
        padding-bottom:5px;
    }
    #leftnav{
        margin-left:20px;
        padding-top:5px;
        padding-bottom:5px;
        display: inline-block;
        float: left;
    }
    #rightnav{
        margin-right:20px;
        padding-top:5px;
        padding-bottom:5px;
        display: inline-block;
        float:right;
    }
</style>