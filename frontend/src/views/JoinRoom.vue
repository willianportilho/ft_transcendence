<template>
  <div class="ContainerBackground">
    <div class="JoinRoomcontainer">
      <h4>Waiting Player</h4>
      <div class="pongBall" style="background-color: #2cf718"></div>
      <div class="pongPaddle" style="background-color: #b9fdd5"></div>
      <button @click="userCancelQueue">Back to Lobby</button>
    </div>
  </div>
</template>

<script>
import { socket } from "./Pong.vue";
import { useAuthStore } from "../stores/authStore";
import { ref } from "vue";
import userService from "../services/UserService";

const authStore = useAuthStore();
let otherPlayer = null;
// if (userData && userData.username) {
//   if (
//     userData.username.trim() == "acosta-a" ||
//     userData.username.trim() == "mamaro-d"
//   ) {
//     otherPlayer = "mamaro-d+acosta-a";
//     console.log("acosta ou mamaro");
//   }
//   if (
//     userData.username.trim() == "gusalves" ||
//     userData.username.trim() == "dpiza"
//   ) {
//     console.log("null");
//   }
// }

export default {
  name: "JoinRoom",
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.getTokenFromCookie();
    this.getLoggedUser();
  },
  methods: {
    getLoggedUser() {
      userService
        .me()
        .then(({ data }) => {
          this.username = data.username;
          authStore.setUser(data);
          this.user = authStore.getUser;
        })
        .catch((error) => {
          this.$router.push({ name: "Login" });
        });
    },
    getTokenFromCookie() {
      const cookies = document.cookie.split(";");

      cookies.forEach((cookie) => {
        if (cookie.trimStart().startsWith("token=")) {
          this.saveToken(cookie.trimStart());
        }
      });
    },
    saveToken(tokenCookie) {
      const token = tokenCookie.substring(6);
      authStore.setToken(token);
    },
    userCancelQueue() {
      this.$router.push("lobby");
      socket.emit("cancelQueue", otherPlayer);
    },
  },
};
</script>
<style scoped>
.ContainerBackground {
  width: 100%;
  height: 100%;
  background-color: #363636;
  display: flex;
  justify-content: center;
  align-items: center;
}
.JoinRoomcontainer {
  width: 20em;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  background: linear-gradient(112.85deg, #1a1a1a 0%, #d9d9d9 100%);
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 999;
  color: white;
}

.JoinRoomcontainer h4 {
  font-size: 2rem;
  margin: 0;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-family: "spoopy";
}

.pongBall {
  position: absolute + 1px;
  width: 20px;
  height: 20px;
  background-color: #2cf718;
  border-radius: 50%;
  animation: bounceBall 0.5s infinite alternate;
}

.pongPaddle {
  position: absolute;
  width: 60px;
  height: 10px;
  background-color: #12f6f9;
}
</style>
