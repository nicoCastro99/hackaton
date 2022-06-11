import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RevealSecretForm from '../secret/RevealSecretForm';
import RegisterSecretForm from '../secret/RegisterSecretForm';
import AccusedSecretForm from '../secret/AccusedSecretForm';
import { ToastContextProvider } from "../../contexts/ToastContext";
import ('../../components/global.scss');

function App() {
	return (
		<ToastContextProvider>
			<Router>
				<Routes>
					<Route path="/">
						<Route path="register" element={<RegisterSecretForm />} />
            <Route path="reveal" element={<RevealSecretForm />} />
            <Route path="accused" element={<AccusedSecretForm />} />
					</Route>
				</Routes>
			</Router>
		</ToastContextProvider>
	);
}

export default App;