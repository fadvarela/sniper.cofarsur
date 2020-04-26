﻿using DataAccess.Access.Peticiones.Sistema;
using DataAccess.Models.Sistema.Login;
using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.RRHH.Consultas.Sistema
{
	public class LoginBackend
	{
		LoginDataAccess loginDataAccess = new LoginDataAccess();
		public Usuario ValidarUsuario(string usuario, string pass, string cuit)
		{
			return loginDataAccess.ValidarUsuario(usuario, pass, cuit);
		}
	}
}
