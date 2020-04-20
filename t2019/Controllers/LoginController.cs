using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Backend.RRHH.Consultas.Sistema;
using Dapper;
using DataAccess.Models.Sistema;
using DataAccess.Models.Sistema.Helper;
using DataAccess.Models.Sistema.Login;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Oracle.ManagedDataAccess.Client;

namespace t2019.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
		// Servicio Backend
		private LoginBackend loginBackend = new LoginBackend();

        [HttpGet("ValidarUsuario")]
        [ProducesResponseType(200, Type = typeof(Usuario))]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public IEnumerable<Usuario> ValidarUsuario([FromQuery]string usuario, string pass, string cuit)
        {
			var result = loginBackend.ValidarUsuario(usuario, pass, cuit);
			return result;
        }

    }
}