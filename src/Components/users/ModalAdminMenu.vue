<template>
  <div id="myModal"  class="modal">
    <div class="row">
      <div class="modal-content col-3">
        <span class="close">&times;</span>
        <label>Enter the number of new users</label>
        <input type="number" v-model="amount" class="form-control">
        <button @click="generateUsers" class="btn btn-outline-secondary my-2">Generate new users</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: 0
    }
  },
  methods: {
    showModal(){
      let modal = document.getElementById("myModal");
      let span = document.getElementsByClassName("close")[0];

      modal.style.display = "block";
      span.onclick = function() {
        modal.style.display = "none";
      }
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    },
    generateUsers(){
      let modal = document.getElementById("myModal");
      modal.style.display = "none";
      this.$eventBus.$emit('usersGenerated', this.amount)
    }
  },
  mounted() {
    this.$eventBus.$on('showModal', () => {
      this.showModal();
    })
  }
}

</script>

<style scoped>
div {
  margin: 10px;
}
input {
  margin: 2px;
}

.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
