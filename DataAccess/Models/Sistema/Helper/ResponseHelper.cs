﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Models.Sistema.Helper
{
	public class ResponseHelper
	{
		[Column("OK")]
		public bool Ok { get; set; }

		[Column("MENSAJE")]
		public string Mensaje { get; set; }

		[Column("URL")]
		public string Url { get; set; }

		[Column("DOWNFILENAME")]
		public string Downfilename { get; set; }

		[NotMapped]
		public dynamic DataResponse { get; set; }
	}
}
