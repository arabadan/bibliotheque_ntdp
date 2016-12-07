/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.unice.miage.ntdp.bibliotheque.bean;

import fr.unice.miage.ntdp.bibliotheque.Personne;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author edou
 */
@Stateless
public class PersonneFacade extends AbstractFacade<Personne> {
    

    public PersonneFacade() {
        super(Personne.class);
    }
    
}
