using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Models.RRHH
{
	public class Justificacion: Nomina
	{
		public long Legajo { get; set; }

		[Column("ID_INCIDENCIA")]
		public long IdIncidencia { get; set; }

		[Column("N_INCIDENCIA")]
		public string Nincidencia { get; set; }

		[Column("FECHA_DESDE")]
		public DateTime FechaDesde { get; set; }

		[Column("FECHA_HASTA")]
		public DateTime FechaHasta { get; set; }

		[Column("DIAS")]
		public long Dias { get; set; }

		[Column("OBSERVACIONES")]
		public string Observaciones { get; set; }

		[Column("ID_JUSTIFICACION")]
		public long IdJustificacion { get; set; }

		[Column("ID_ESTADO")]
		public long IdEstado { get; set; }

		[Column("N_ESTADO")]
		public string Nestado { get; set; }

		[Column("ID_PATOLOGIA")]
		public long IdPatologia { get; set; }

		[Column("N_PATOLOGIA")]
		public string Npatologia { get; set; }

		public bool Anula { get; set; }
	}
}
