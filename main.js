const userTable = document.getElementById("userTable");
const saveBtn = document.getElementById("saveBtn");

const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const roleInput = document.getElementById("role");
const groupInput = document.getElementById("group");
const statusInput = document.getElementById("status");

let editId = null;
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}
function renderUsers() {
  const users = getUsers();
  userTable.innerHTML = "";

  users.forEach((user, index) => {
    userTable.innerHTML += `
      <tr class="border-t">
        <td class="p-2">${index + 1}</td>
        <td class="p-2">${user.name}</td>
        <td class="p-2">${user.email}</td>
        <td class="p-2">${user.phone}</td>
        <td class="p-2">${user.role}</td>
        <td class="p-2">
          <span class="${
            user.status === "Kích hoạt"
              ? "text-green-600"
              : "text-gray-500"
          }">
            ${user.status}
          </span>
        </td>
        <td class="p-2 space-x-2">
          <button onclick="editUser(${user.id})" class="text-blue-600">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button onclick="deleteUser(${user.id})" class="text-red-600">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}
saveBtn.addEventListener("click", () => {
  const users = getUsers();

  if (!nameInput.value || !emailInput.value || !phoneInput.value) {
    alert("Vui lòng nhập đủ thông tin");
    return;
  }

  const userData = {
    id: editId ?? Date.now(),
    name: nameInput.value,
    password: passwordInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    role: roleInput.value,
    group: groupInput.value,
    status: statusInput.value,
  };

  if (editId) {
    const index = users.findIndex(u => u.id === editId);
    users[index] = userData;
    editId = null;
  } else {
    users.push(userData);
  }
  saveUsers(users);
  renderUsers();
  clearForm();
});
function editUser(id) {
  const users = getUsers();
  const user = users.find(u => u.id === id);
  nameInput.value = user.name;
  passwordInput.value = user.password;
  emailInput.value = user.email;
  phoneInput.value = user.phone;
  roleInput.value = user.role;
  groupInput.value = user.group;
  statusInput.value = user.status;
  editId = id;
}
function deleteUser(id) {
  if (!confirm("Bạn có chắc muốn xoá?")) return;
  const users = getUsers().filter(u => u.id !== id);
  saveUsers(users);
  renderUsers();
}
function clearForm() {
  nameInput.value = "";
  passwordInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  roleInput.value = "";
  groupInput.value = "";
  statusInput.value = "Kích hoạt";
}

renderUsers();
