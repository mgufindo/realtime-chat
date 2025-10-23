<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 class="text-3xl font-bold text-gray-800">WhatsApp Style Chat</h1>
        <p class="text-gray-600 mt-2">
          Pilih atau buat room chat untuk mulai mengobrol
        </p>

        <!-- User Info -->
        <div class="mt-4 p-3 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-800">
            👤 Anda sebagai: <strong>{{ username }}</strong>
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Sidebar - List Chat Rooms -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-lg p-4">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold">Chat Rooms</h2>
              <div class="flex space-x-1">
                <!-- Refresh Button -->
                <button
                  @click="refreshChatrooms"
                  :disabled="loadingRooms"
                  class="bg-gray-600 text-white p-1 rounded-lg text-sm hover:bg-gray-700 disabled:bg-gray-300"
                  title="Refresh rooms"
                >
                  <svg
                    class="w-4 h-4"
                    :class="{ 'animate-spin': loadingRooms }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
                <!-- New Room Button -->
                <button
                  @click="showCreateRoom = true"
                  class="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
                >
                  + New
                </button>
              </div>
            </div>

            <!-- Last Updated Time -->
            <div
              v-if="lastUpdated"
              class="text-xs text-gray-500 mb-2 text-center"
            >
              Last updated: {{ formatRelativeTime(lastUpdated) }}
            </div>

            <!-- Loading State -->
            <div v-if="loadingRooms" class="text-center py-4">
              <div
                class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"
              ></div>
              <p class="text-sm text-gray-500 mt-2">Loading rooms...</p>
            </div>

            <!-- Room List -->
            <div v-else class="space-y-2">
              <div
                v-for="room in chatrooms"
                :key="room.id"
                @click="selectRoom(room)"
                :class="[
                  'p-3 rounded-lg cursor-pointer transition-colors group relative',
                  selectedRoom?.id === room.id
                    ? 'bg-blue-100 border border-blue-300'
                    : 'bg-gray-50 hover:bg-gray-100',
                ]"
              >
                <!-- Delete Button (Hover) -->
                <button
                  @click.stop="confirmDeleteRoom(room)"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  ×
                </button>

                <div class="font-medium text-gray-800">{{ room.name }}</div>
                <div class="text-xs text-gray-500 mt-1">
                  Created: {{ formatTime(room.created_at) }}
                </div>
                <!-- Message Count Badge -->
                <div
                  v-if="room.message_count > 0"
                  class="absolute -top-1 -left-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  {{ room.message_count }}
                </div>
              </div>

              <div
                v-if="chatrooms.length === 0"
                class="text-center text-gray-500 py-4"
              >
                <p class="mb-2">No chat rooms yet</p>
                <button
                  @click="showCreateRoom = true"
                  class="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
                >
                  Create First Room
                </button>
              </div>
            </div>

            <!-- Auto-refresh Toggle -->
            <div class="mt-4 pt-4 border-t">
              <label
                class="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer"
              >
                <input
                  type="checkbox"
                  v-model="autoRefresh"
                  class="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Auto-refresh every 30s</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Main Chat Area -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
            <!-- Room Header -->
            <div
              v-if="selectedRoom"
              class="border-b p-4 bg-green-600 text-white"
            >
              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-4">
                  <h2 class="text-xl font-semibold">{{ selectedRoom.name }}</h2>
                  <!-- Refresh Messages Button -->
                  <button
                    @click="refreshMessages"
                    :disabled="loadingMessages"
                    class="bg-green-700 text-white p-1 rounded-lg hover:bg-green-800 disabled:bg-green-300"
                    title="Refresh messages"
                  >
                    <svg
                      class="w-4 h-4"
                      :class="{ 'animate-spin': loadingMessages }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="text-green-100 text-sm">
                    {{ messages.length }} messages
                  </div>
                  <button
                    @click="copyRoomLink"
                    class="bg-green-700 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-800"
                  >
                    📋 Share Room
                  </button>
                  <button
                    @click="confirmDeleteRoom(selectedRoom)"
                    class="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700"
                  >
                    🗑️ Delete Room
                  </button>
                </div>
              </div>
              <!-- Messages Last Updated -->
              <div
                v-if="messagesLastUpdated"
                class="text-green-100 text-xs mt-1"
              >
                Messages updated: {{ formatRelativeTime(messagesLastUpdated) }}
              </div>
            </div>

            <!-- No Room Selected -->
            <div v-else class="border-b p-4">
              <h2 class="text-xl font-semibold text-gray-600">
                {{
                  loadingRooms
                    ? "Loading rooms..."
                    : "Select a chat room to start chatting"
                }}
              </h2>
            </div>

            <!-- Messages Container dengan background WhatsApp -->
            <div
              ref="messagesContainer"
              class="flex-1 overflow-y-auto p-4 bg-gray-100 bg-chat-background"
              :style="{
                backgroundImage:
                  'url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)',
              }"
            >
              <!-- Welcome Message -->
              <div
                v-if="selectedRoom && messages.length === 0"
                class="text-center py-8"
              >
                <div class="bg-white rounded-lg p-4 max-w-md mx-auto shadow-sm">
                  <p class="text-gray-600">No messages yet.</p>
                  <p class="text-sm text-gray-500 mt-1">
                    Be the first to start the conversation!
                  </p>
                </div>
              </div>

              <!-- Messages List -->
              <div
                v-for="message in messages"
                :key="message.id"
                :class="[
                  'flex mb-2',
                  message.username === username
                    ? 'justify-end'
                    : 'justify-start',
                ]"
              >
                <!-- Other People's Messages (Left) -->
                <div
                  v-if="message.username !== username"
                  class="flex items-end space-x-2 max-w-[70%]"
                >
                  <!-- Avatar -->
                  <div
                    class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  >
                    {{ getInitials(message.username) }}
                  </div>
                  <!-- Message Bubble -->
                  <div
                    class="bg-white rounded-lg rounded-bl-none p-3 shadow-sm"
                  >
                    <div class="flex items-baseline space-x-2 mb-1">
                      <span class="font-semibold text-gray-800 text-sm">{{
                        message.username
                      }}</span>
                    </div>
                    <p class="text-gray-700">{{ message.content }}</p>
                    <div class="text-xs text-gray-400 mt-1 text-left">
                      {{ formatTime(message.created_at) }}
                    </div>
                  </div>
                </div>

                <!-- Our Messages (Right) -->
                <div v-else class="flex items-end space-x-2 max-w-[70%]">
                  <!-- Message Bubble -->
                  <div
                    class="bg-green-100 rounded-lg rounded-br-none p-3 shadow-sm"
                  >
                    <p class="text-gray-800">{{ message.content }}</p>
                    <div class="text-xs text-gray-500 mt-1 text-right">
                      {{ formatTime(message.created_at) }}
                    </div>
                  </div>
                  <!-- Our Avatar -->
                  <div
                    class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  >
                    {{ getInitials(username) }}
                  </div>
                </div>
              </div>

              <!-- No Room Selected Message -->
              <div
                v-if="!selectedRoom && !loadingRooms"
                class="text-center text-gray-500 py-8"
              >
                <div class="bg-white rounded-lg p-4 max-w-md mx-auto shadow-sm">
                  <p>👈 Select a chat room from the sidebar</p>
                  <p class="text-sm mt-1">
                    Or create a new one to start chatting
                  </p>
                </div>
              </div>
            </div>

            <!-- Message Input -->
            <div v-if="selectedRoom" class="border-t bg-white p-4">
              <form @submit.prevent="sendMessage" class="flex space-x-2">
                <input
                  v-model="newMessage"
                  type="text"
                  placeholder="Type a message..."
                  class="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  :disabled="loading"
                />
                <button
                  type="submit"
                  :disabled="!newMessage.trim() || loading"
                  class="bg-green-600 text-white w-12 h-12 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-green-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <svg
                    v-if="!loading"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                  <div
                    v-else
                    class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"
                  ></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Room Modal -->
    <div
      v-if="showCreateRoom"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold mb-4">Create New Chat Room</h3>
        <form @submit.prevent="createRoom">
          <input
            v-model="newRoomName"
            type="text"
            placeholder="Enter room name..."
            class="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="showCreateRoom = false"
              class="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="roomToDelete"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold mb-4 text-red-600">Delete Room</h3>
        <p class="text-gray-600 mb-4">
          Are you sure you want to delete "<strong>{{
            roomToDelete.name
          }}</strong
          >"?
        </p>
        <p class="text-sm text-gray-500 mb-4">
          This will permanently delete all messages in this room.
        </p>
        <div class="flex justify-end space-x-2">
          <button
            type="button"
            @click="roomToDelete = null"
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            @click="deleteRoom(roomToDelete)"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Delete Room
          </button>
        </div>
      </div>
    </div>

    <!-- Success Notification -->
    <div
      v-if="showSuccess"
      class="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg"
    >
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup>
const chatrooms = ref([]);
const selectedRoom = ref(null);
const messages = ref([]);
const newMessage = ref("");
const newRoomName = ref("");
const showCreateRoom = ref(false);
const showSuccess = ref(false);
const successMessage = ref("");
const loading = ref(false);
const loadingRooms = ref(false);
const loadingMessages = ref(false);
const roomToDelete = ref(null);
const messagesContainer = ref(null);
const lastUpdated = ref(null);
const messagesLastUpdated = ref(null);
const autoRefresh = ref(false);
const autoRefreshInterval = ref(null);

// Generate random username dengan nama yang lebih realistis
const usernames = [
  "Alex Johnson",
  "Sarah Miller",
  "Mike Chen",
  "Emma Davis",
  "James Wilson",
  "Lisa Brown",
];
const username = ref(usernames[Math.floor(Math.random() * usernames.length)]);

// Format time
const formatTime = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

// Format relative time (e.g., "2 seconds ago")
const formatRelativeTime = (timestamp) => {
  const now = new Date();
  const diff = now - new Date(timestamp);
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  return `${Math.floor(seconds / 3600)} hours ago`;
};

// Get initials for avatar
const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Auto-scroll to bottom
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

// Refresh chatrooms
const refreshChatrooms = async () => {
  loadingRooms.value = true;
  console.log("🔄 Manually refreshing chatrooms...");

  try {
    const response = await $fetch("/api/chatrooms");

    console.log("✅ Chatrooms refreshed:", response.length, "rooms");
    chatrooms.value = response;
    lastUpdated.value = new Date();

    // Show success message
    showSuccessMessage(`${response.length} rooms loaded`);
  } catch (error) {
    console.error("❌ Failed to refresh chatrooms:", error);
    showSuccessMessage("Failed to refresh rooms", true);
  } finally {
    loadingRooms.value = false;
  }
};

// Refresh messages for current room
const refreshMessages = async () => {
  if (!selectedRoom.value) return;

  loadingMessages.value = true;
  console.log("🔄 Manually refreshing messages...");

  try {
    const response = await $fetch(
      `/api/chatrooms/${selectedRoom.value.id}/messages`
    );

    console.log("✅ Messages refreshed:", response.length, "messages");
    messages.value = response;
    messagesLastUpdated.value = new Date();
    scrollToBottom();

    showSuccessMessage(`${response.length} messages loaded`);
  } catch (error) {
    console.error("❌ Failed to refresh messages:", error);
    showSuccessMessage("Failed to refresh messages", true);
  } finally {
    loadingMessages.value = false;
  }
};

// Show success message
const showSuccessMessage = (message, isError = false) => {
  successMessage.value = message;
  showSuccess.value = true;

  setTimeout(() => {
    showSuccess.value = false;
  }, 3000);
};

// Fetch chat rooms - AUTO LOAD ON START
const fetchChatrooms = async () => {
  loadingRooms.value = true;
  console.log("🔄 Fetching chatrooms from API...");

  try {
    const response = await $fetch("/api/chatrooms");

    console.log("✅ Chatrooms loaded:", response.length, "rooms");
    chatrooms.value = response;
    lastUpdated.value = new Date();

    // Auto-select first room if available
    if (response.length > 0 && !selectedRoom.value) {
      console.log("🎯 Auto-selecting first room:", response[0].name);
      await selectRoom(response[0]);
    }
  } catch (error) {
    console.error("❌ Failed to fetch chatrooms:", error);
    chatrooms.value = [];
  } finally {
    loadingRooms.value = false;
  }
};

// Select chat room
const selectRoom = async (room) => {
  console.log("🎯 Selecting room:", room.name, room.id);
  selectedRoom.value = room;
  messages.value = [];
  await fetchMessages(room.id);
  startPolling(room.id);
};

// Fetch messages for selected room
const fetchMessages = async (roomId) => {
  console.log("📨 Fetching messages for room:", roomId);
  try {
    const response = await $fetch(`/api/chatrooms/${roomId}/messages`);

    console.log("✅ Messages loaded:", response.length, "messages");
    messages.value = response;
    messagesLastUpdated.value = new Date();
    scrollToBottom();
  } catch (error) {
    console.error("❌ Failed to fetch messages:", error);
  }
};

// Send message
const sendMessage = async () => {
  if (!newMessage.value.trim() || !selectedRoom.value || loading.value) return;

  loading.value = true;
  console.log("📤 Sending message:", newMessage.value);

  try {
    await $fetch(`/api/chatrooms/${selectedRoom.value.id}/messages`, {
      method: "POST",
      body: {
        content: newMessage.value.trim(),
        username: username.value,
      },
    });

    console.log("✅ Message sent successfully");
    newMessage.value = "";

    // Auto-refresh messages after sending
    await refreshMessages();
  } catch (error) {
    console.error("❌ Failed to send message:", error);
    showSuccessMessage("Failed to send message", true);
  } finally {
    loading.value = false;
  }
};

// Create new room
const createRoom = async () => {
  if (!newRoomName.value.trim()) return;

  console.log("🏗️ Creating new room:", newRoomName.value);

  try {
    const response = await $fetch("/api/chatrooms", {
      method: "POST",
      body: {
        name: newRoomName.value.trim(),
      },
    });

    console.log("✅ Room created successfully:", response.name);
    chatrooms.value.push(response);
    newRoomName.value = "";
    showCreateRoom.value = false;
    await selectRoom(response);

    showSuccessMessage(`Room "${response.name}" created`);
  } catch (error) {
    console.error("❌ Failed to create room:", error);
    showSuccessMessage("Failed to create room", true);
  }
};

// Delete room
const deleteRoom = async (room) => {
  console.log("🗑️ Deleting room:", room.name, room.id);

  try {
    await $fetch(`/api/chatrooms/${room.id}`, {
      method: "DELETE",
    });

    console.log("✅ Room deleted successfully");

    // Remove from chatrooms list
    chatrooms.value = chatrooms.value.filter((r) => r.id !== room.id);

    // If deleted room was selected, clear selection
    if (selectedRoom.value && selectedRoom.value.id === room.id) {
      selectedRoom.value = null;
      messages.value = [];
      stopPolling();
    }

    roomToDelete.value = null;

    // Auto-select first room if available
    if (chatrooms.value.length > 0 && !selectedRoom.value) {
      await selectRoom(chatrooms.value[0]);
    }

    showSuccessMessage(`Room "${room.name}" deleted`);
  } catch (error) {
    console.error("❌ Failed to delete room:", error);
    showSuccessMessage("Failed to delete room", true);
  }
};

// Confirm delete room
const confirmDeleteRoom = (room) => {
  roomToDelete.value = room;
};

// Share room link
const copyRoomLink = async () => {
  if (!selectedRoom.value) return;

  const roomLink = `${window.location.origin}/chat?room=${selectedRoom.value.id}`;

  try {
    await navigator.clipboard.writeText(roomLink);
    showSuccessMessage("Room link copied to clipboard!");
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = roomLink;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    showSuccessMessage("Room link copied to clipboard!");
  }
};

// Real-time polling for messages
const pollInterval = ref(null);

const startPolling = (roomId) => {
  stopPolling();
  console.log("🔄 Starting polling for room:", roomId);
  pollInterval.value = setInterval(async () => {
    if (selectedRoom.value && selectedRoom.value.id === roomId) {
      await fetchMessages(roomId);
    }
  }, 2000);
};

const stopPolling = () => {
  if (pollInterval.value) {
    console.log("🛑 Stopping polling");
    clearInterval(pollInterval.value);
    pollInterval.value = null;
  }
};

// Auto-refresh chatrooms
const startAutoRefresh = () => {
  stopAutoRefresh();
  console.log("🔄 Starting auto-refresh every 30s");
  autoRefreshInterval.value = setInterval(async () => {
    console.log("🔄 Auto-refreshing chatrooms...");
    await refreshChatrooms();
  }, 30000); // 30 seconds
};

const stopAutoRefresh = () => {
  if (autoRefreshInterval.value) {
    console.log("🛑 Stopping auto-refresh");
    clearInterval(autoRefreshInterval.value);
    autoRefreshInterval.value = null;
  }
};

// Watch auto-refresh toggle
watch(autoRefresh, (newVal) => {
  if (newVal) {
    startAutoRefresh();
  } else {
    stopAutoRefresh();
  }
});

// AUTO LOAD ON MOUNT
onMounted(async () => {
  console.log("🚀 Chat component mounted");
  await fetchChatrooms();
});

onUnmounted(() => {
  stopPolling();
  stopAutoRefresh();
});
</script>

<style>
.bg-chat-background {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
