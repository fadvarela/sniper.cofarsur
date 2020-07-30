using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Models.RRHH
{
	public class Incidencia: Novedad
	{
		[Column("ID_ESTADO")]
		public long IdEstado { get; set; }

		[Column("N_ESTADO")]
		public string Nestado { get; set; }

		[Column("N_PATOLOGIA")]
		public string Npatologia { get; set; }

		[Column("FUM")]
		public DateTime FechaModificacion { get; set; }

		[Column("ID_USUARIO_FUM")]
		public long IdUsuario { get; set; }

		[Column("N_USUARIO")]
		public string Nusuario { get; set; }

	}
}
