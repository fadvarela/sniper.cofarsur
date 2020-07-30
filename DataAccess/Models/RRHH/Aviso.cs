using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models.RRHH
{
	public class Aviso : Novedad
	{
		[Column("DIAS")]
		public long Dias { get; set; }

		[Column("ID_AVISO")]
		public long IdAviso { get; set; }

		[Column("ID_ESTADO")]
		public long IdEstado { get; set; }

		[Column("N_ESTADO")]
		public string Nestado { get; set; }

		[Column("ID_PATOLOGIA")]
		public long IdPatologia { get; set; }

		[Column("N_PATOLOGIA")]
		public string Npatologia { get; set; }

		[Column("FECHA")]
		public DateTime FechaDesde { get; set; }

		[Column("FUM")]
		public DateTime FechaRegistro { get; set; }

		[Column("ID_USUARIO_FUM")]
		public long IdUsuarioFum { get; set; }

		[Column("N_USUARIO")]
		public string Nusuario { get; set; }

		[Column("ID_NOV_INCIDENCIA")]
		public long IdNovIncidencia { get; set; }


	}
}
