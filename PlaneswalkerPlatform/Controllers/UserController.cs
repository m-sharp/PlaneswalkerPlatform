﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using PlaneswalkerPlatform.Models;

namespace PlaneswalkerPlatform.Controllers {
    public class UserController : ApiController {
        private PlaneswalkerPlatformContext db = new PlaneswalkerPlatformContext();

        // GET api/User
        public IQueryable<User> GetUsers() {
            return db.Users;
        }

        // GET api/User/5
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> GetUser(int id) {
            User user = await db.Users.FindAsync(id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        // PUT api/User/5
        public async Task<IHttpActionResult> PutUser(int id, User user) {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != user.UserId)
                return BadRequest();

            db.Entry(user).State = EntityState.Modified;

            try {
                await db.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException) {
                if (!UserExists(id))
                    return NotFound();
                else
                    throw;
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/User
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> PostUser(User user) {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            db.Users.Add(user);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = user.UserId }, user);
        }

        // DELETE api/User/5
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> DeleteUser(int id) {
            User user = await db.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            db.Users.Remove(user);
            await db.SaveChangesAsync();

            return Ok(user);
        }

        protected override void Dispose(bool disposing) {
            if (disposing)
                db.Dispose();
            base.Dispose(disposing);
        }

        private bool UserExists(int id) {
            return db.Users.Count(e => e.UserId == id) > 0;
        }
    }
}