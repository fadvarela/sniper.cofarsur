using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Models.RRHH
{
	public class Marcacion: Novedad
	{
		[Column("ID_MARCACION")]
		public long IdMarcacion { get; set; }

		[Column("HORA")]
		public string Hora { get; set; }

		[Column("ID_MARCACION_TIPO")]
		public long IdMarcacionTipo { get; set; }

		[Column("N_MARCACION_TIPO")]
		public string NmarcacionTipo { get; set; }

		[Column("ID_MARCACION_FUENTE")]
		public long IdMarcacionFuente { get; set; }

		[Column("N_MARCACION_FUENTE")]
		public string NmarcacionFuente { get; set; }

		[Column("ID_EQUIPO")]
		public long IdEquipo { get; set; }

		[Column("N_EQUIPO")]
		public string Nequipo { get; set; }

		[Column("ID_ESTADO")]
		public long IdEstado { get; set; }

		[Column("N_ESTADO")]
		public string Nestado { get; set; }

		[Column("LATITUD")]
		public string Latitud { get; set; }

		[Column("LONGITUD")]
		public string Longitud { get; set; }

		[Column("FOTO")]
		public string Foto { get; set; }

		[Column("OK")]
		public bool Ok { get; set; }

	}
}
