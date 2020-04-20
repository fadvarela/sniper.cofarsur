using DataAccess.Models.Sistema.Helper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Models.Sistema.Login
{
	public class Usuario : ResponseHelper
	{
		[Column("ID_USUARIO")]
		public long IdUsuario { get; set; }

		[Column("N_USUARIO")]
		public string NomUsuario { get; set; }

		[Column("ID_ROL")]
		public long IdRol { get; set; }

		[Column("CUIT")]
		public string Cuit { get; set; }
	}
}
