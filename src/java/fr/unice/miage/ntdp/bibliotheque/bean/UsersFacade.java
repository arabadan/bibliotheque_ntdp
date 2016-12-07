/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.unice.miage.ntdp.bibliotheque.bean;

import fr.unice.miage.ntdp.bibliotheque.Users;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author edou
 */
@Stateless
public class UsersFacade extends AbstractFacade<Users> {
    

    public UsersFacade() {
        super(Users.class);
    }
    
}
