import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import BudgetPage from "@/components/pages/BudgetPage";
import AccountsPage from "@/components/pages/AccountsPage";
import TransactionsPage from "@/components/pages/TransactionsPage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<BudgetPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-50"
      />
    </>
  );
}

export default App;