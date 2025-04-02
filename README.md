# CSV to JSON Converter API

This project allows users to **upload a CSV file**, **convert it into JSON**, **store the data in PostgreSQL**, and generate an **age distribution report**.

---

## 🚀 Getting Started

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/your-username/your-repo.git
```

### **2️⃣ Navigate to the Project Folder**

```sh
cd your-repo
```

### **3️⃣ Install Dependencies**

```sh
npm install
```

### **4️⃣ Create a `.env` File**

Run the following command:

```sh
touch .env
```

Then, add the following content to the `.env` file:

```
PORT=3001
DATABASE_URL=postgres://postgres:password@localhost:8082/csvToJson
```

## **5️⃣ Start the Server**

```sh
node server.js
```

The app will be available at:
🔗 **`http://localhost:3000`**

---

## 📤 Upload & Convert CSV

1️⃣ **Visit:** `http://localhost:3000/`<br>
2️⃣ **Click** `Choose File` and select a **CSV file**`<br>
3️⃣ **Click** `Upload`→ Then click`Convert``<br>
4️⃣ The processed file will be **moved to `/success` folder** with a timestamped filename`<br>
5️⃣ The **Age Distribution report** will be displayed on the console

---

## 📄 Sample CSV File

📌 **For a sample CSV file, navigate to the `/success` folder.**

---

```

```
