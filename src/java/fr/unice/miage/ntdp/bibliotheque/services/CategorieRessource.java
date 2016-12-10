/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.unice.miage.ntdp.bibliotheque.services;

import fr.unice.miage.ntdp.bibliotheque.Categorie;
import fr.unice.miage.ntdp.bibliotheque.bean.AbstractFacade;
import java.util.List;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author B4RL1V3
 */
@Path("categorie-bis")
@Stateless
public class CategorieRessource extends AbstractFacade<Categorie> {
    public CategorieRessource() {
        super(Categorie.class);
    }
    
    @GET
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Categorie> list() {
        return super.findAll();
    }
    
    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Categorie getOne(@PathParam("id") Long id) {
            return super.find(id);
    }
    
    @POST
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @Produces(MediaType.TEXT_PLAIN)
    /* {"nom":"unnom", "description":"desj"} */
    public String add(Categorie c) {
        try {
            super.create(c);
            return "Catégorie créée !";
        } catch(Exception e) {
            return "Erreur pendant la création de la catégorie !";
        }
    }
    
    @DELETE
    @Path("{id}")
    @Produces(MediaType.TEXT_PLAIN)
    public String delete(@PathParam("id") Long id) {
        try {
            super.remove(super.find(id));
            return "Catégorie supprimée !";
        } catch(Exception e) {
            return "Erreur pendant la suppression de la catégorie !";
        }
    }
    
    @PUT
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @Produces({MediaType.TEXT_PLAIN})
    public String update(Categorie c) {
        try {
            super.edit(c);
            return "Catégorie modifiée !";
        } catch(Exception e) {
            return "Erreur pendant la modification de la catégorie !";
        }
    }
    
    @GET
    @Path("count")
    @Produces({MediaType.TEXT_PLAIN})
    public int compter() {
        return super.count();
    }
    
    @GET
    @Path("findByRange/{min}+{max}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Categorie> findByRange(@PathParam("min") int min, @PathParam("max") int max) {
        int[] range = {
            min, max
        };
        
        return super.findRange(range);
    }
}
