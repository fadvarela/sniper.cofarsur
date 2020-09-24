using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Models.RRHH
{
	public class Vacacion : Nomina
	{
		[Column("ID_ESTADO")]
		public long IdEstado { get; set; }

		[Column("N_ESTADO")]
		public string Nestado { get; set; }

		[Column("ID_INCIDENCIA")]
		public long IdIncidencia { get; set; }

		[Column("N_INCIDENCIA")]
		public string Nincidencia { get; set; }

		[Column("FECHA_DESDE")]
		public DateTime FechaDesde { get; set; }

		[Column("FECHA_HASTA")]
		public DateTime FechaHasta { get; set; }

		[Column("FECHA_REGISTRO")]
		public DateTime FechaRegistro { get; set; }

		[Column("DIAS")]
		public long Dias { get; set; }

		[Column("ID_JUSTIFICACION")]
		public long IdJustificacion { get; set; }

		[Column("OBSERVACIONES")]
		public string Observaciones { get; set; }

		[Column("PERIODO")]
		public string Periodo { get; set; }

		[Column("DIAS_DEVENGADOS")]
		public long DiasDevengados { get; set; }

		[Column("DIAS_PERCIBIDOS")]
		public long DiasPercibidos { get; set; }

		[Column("SALDO_PERIODO")]
		public long SaldoPeriodo { get; set; }

		[Column("URL")]
		public string Url { get; set; }

		[Column("DOWNFILENAME")]
		public string Filename { get; set; }

		public bool Anulacion { get; set; }
		
	}
}
