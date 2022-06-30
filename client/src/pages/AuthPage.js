import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import useMessage from "../hooks/message.hook";


export default function AuthPage() {
    const {loading, error, request, clearError} = useHttp();
    const auth = useContext(AuthContext);
    const message = useMessage();
    
    useEffect(() => { message(error); clearError(); }, [error, message, clearError]);
    useEffect(() => { window.M.updateTextFields(); }, []);

    const [form, setForm] = useState({ name: '', password: '' });

    const changeHandler = (event) => { setForm({...form, [event.target.name]: event.target.value}) }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch(e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch(e) {}
    }

    return(
        <div className="row">
            <div className="col s12 offset-s3">

                <div className="row">
                    <div className="col s12 m6">
                        <div className="card transparent darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Log In</span>
                                <div>
                                    <div className="input-field">
                                        <input 
                                        className="input"
                                            placeholder="Input e-mail" 
                                            id="name" 
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={changeHandler} />
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    <div className="input-field">
                                        <input 
                                            className="input"
                                            placeholder="Input password" 
                                            id="password" 
                                            type="password"
                                            name="password"
                                            value={form.password}
                                            onChange={changeHandler} />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </div>
                            </div>
                            <div className="card-action">
                                <button 
                                    className="btn yellow darken-4"
                                    onClick={loginHandler}
                                    disabled={loading}>Войти</button>
                                <button 
                                    className="btn grey lighten-1 black-text"
                                    onClick={registerHandler}
                                    disabled={loading}>Регистрация</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}