# Source index

This is an inventory of sources actually used or explicitly referenced in the first theta research pass. It deliberately separates **explicit references in the lectures** from **background sources found during verification**.

## Richard E. Borcherds — 2024 elliptic-functions mini-course

| Lecture | Source | Verified description |
|---|---|---|
| 1. Weierstrass function | <https://www.youtube.com/watch?v=7kPKICWkVG0> | Basic properties of Weierstrass `P`; explicitly credits Jahnke–Emde for pictures. |
| 2. Addition law | <https://www.youtube.com/watch?v=c59ozRhz6Bw> | Addition law/group structure of the Weierstrass cubic. |
| 3. Jacobi functions | <https://www.youtube.com/watch?v=AAa9VeE6QuU> | `sn`, `cn`, `dn`; interpretation as sections of order-2 line bundles. |
| 4. Sigma function | <https://www.youtube.com/watch?v=c--3czekwug> | Sigma as a theta function; quasi-periodicity and construction of elliptic functions. |

### Explicit bibliography found in the lectures

So far I can verify one explicit bibliographic reference:

- Eugen Jahnke and Fritz Emde, *Tables of Functions with Formulae and Curves*. Borcherds explicitly says the pictures in lecture 1 come from this book. See [`../sources/jahnke-emde.md`](../sources/jahnke-emde.md).

I searched the indexed descriptions/transcripts for the remaining lectures for explicit books/papers. I did **not** find a second explicit bibliographic citation. Mathematical names mentioned in exposition — Weierstrass, Jacobi, Riemann, etc. — are not being silently converted into bibliography entries.

This is a negative-result statement, not a claim that Borcherds could not have made an offhand spoken reference that escaped the available transcript indexing.

## Richard E. Borcherds — modular-forms theta lectures

- **Theta functions**: <https://www.youtube.com/watch?v=9xQd9Ab8iNg>
  - one-dimensional lattice theta;
  - Poisson summation;
  - modular transformation;
  - Riemann zeta functional equation.
- **Theta functions in higher dimensions**: <https://www.youtube.com/watch?v=pQt485iPusI>
  - even unimodular lattices;
  - `E8`;
  - Leech lattice;
  - dimension divisible by 8;
  - isospectral/non-isometric examples (“hear the shape of a drum” theme).

The descriptions do not supply bibliographic references.

## Jahnke–Emde

Public-domain-marked Internet Archive / Digital Library of India item:

<https://archive.org/details/in.ernet.dli.2015.212842>

- Archive metadata marks this specific item `In Public Domain`.
- Exact relevant printed pages and Archive leaf numbers are in [`../sources/jahnke-emde.md`](../sources/jahnke-emde.md).
- Reproducible PDF fetcher: [`../sources/fetch-jahnke-emde.sh`](../sources/fetch-jahnke-emde.sh).

Independent page check:

- NIST DLMF §20.15, theta-function tables: <https://dlmf.nist.gov/20.15>
- DLMF bibliography: <https://dlmf.nist.gov/bib/J>

## David Mumford — *Tata Lectures on Theta*

### Volume I

- Author-hosted complete PDF: <https://www.dam.brown.edu/people/mumford/alg_geom/papers/Tata1.pdf>
- Springer: <https://link.springer.com/book/10.1007/978-0-8176-4577-9>
- Detailed reading map: [`mumford-tata-lectures.md`](mumford-tata-lectures.md)

### Volume II

- Author-hosted complete PDF: <https://www.dam.brown.edu/people/mumford/alg_geom/papers/Tata2.pdf>
- Springer: <https://link.springer.com/book/10.1007/978-0-8176-4578-6>
- Detailed reading map: [`mumford-tata-lectures.md`](mumford-tata-lectures.md)

### Volume III

- Google Books bibliographic/contents preview: <https://books.google.com/books?id=Y6mn6ILOAN8C>
- No complete author-hosted `Tata3.pdf` was found in Mumford's Brown paper archive during this pass.
- Treat as copyrighted/library/publisher material unless a rights-cleared complete copy is later located.

### Mumford's site rights statement

<https://www.dam.brown.edu/people/mumford/about.html>

Mumford states that he favors free scholarly dissemination, grants his own untransferred rights broadly, and labels his site content CC BY-NC-SA. The Tata I/II scans themselves, however, contain Birkhäuser copyright / all-rights-reserved notices. Because those statements are not obviously reconcilable for redistribution, this repository **links to the author-hosted PDFs instead of copying them**.

## Verification/background sources not claimed as Borcherds citations

These are useful cross-checks, but there is no evidence in this pass that Borcherds explicitly cited them in the six lectures above:

- NIST Digital Library of Mathematical Functions, Chapter 20 (Theta Functions): <https://dlmf.nist.gov/20>
- David Mumford, *Tata Lectures on Theta* I–III (above).

More background references can be added later, but they should be labeled as our bibliography rather than retroactively attributed to Borcherds.
