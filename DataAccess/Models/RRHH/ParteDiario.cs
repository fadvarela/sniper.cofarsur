using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models.RRHH
{
	//A.sector,
	//     A.legajo,
	//     A.apellido,
	//     A.nombre,
	//     A.fecha,
	//     A.jornadas,
	//     A.marcaciones,
	//     A.hs_trabajadas,
	//     A.incidencias,
	//     A.anomalias,
	//     A.controles,
	//     A.permisos
	public class ParteDiario : Nomina
	{
		[Column("SECTOR")]
		public string Sector { get; set; }

		[Column("FECHA")]
		public DateTime Fecha { get; set; }

		[Column("JORNADAS")]
		public string Jornada { get; set; }

		[Column("MARCACIONES")]
		public string Marcaciones { get; set; }

		[Column("HS_TRABAJADAS")]
		public long HsTrabajadas { get; set; }
	}
}
