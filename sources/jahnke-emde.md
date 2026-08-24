# Jahnke & Emde: *Tables of Functions with Formulae and Curves*

Richard Borcherds explicitly credits this book for the elliptic-function pictures in the first lecture of his 2024 elliptic-functions series.

## Copy

Eugen Jahnke and Fritz Emde, *Tables of Functions with Formulae and Curves*, enlarged/revised 4th edition, Dover, 1945.

Internet Archive / Digital Library of India item:

<https://archive.org/details/in.ernet.dli.2015.212842>

The item metadata explicitly says:

- publication date: 1945
- contributors: Eugen Jahnke and Fritz Emde
- publisher: Dover Publications
- `dc.rights: In Public Domain`
- 400 scanned pages

The Archive offers the original PDF, a PDF with OCR text, EPUB, and full text. A reproducible downloader is in [`fetch-jahnke-emde.sh`](fetch-jahnke-emde.sh).

I am recording the Archive/DLI rights statement rather than independently making a universal copyright determination about every edition. The same Archive also has other copies with different access restrictions. This specific DLI item is the one whose metadata says “In Public Domain.”

## Why the pictures look the way they do

Emde explains the graphical convention in the preface to the 1933 edition, retained in this volume. He rejects separate plots of real and imaginary parts because multiplication by a complex constant changes them drastically. Instead he represents a complex function by a surface whose vertical coordinate is its modulus `|f(z)|`, calling this the **relief of the function**.

That convention is mathematically and game-design relevant: zeros become pits touching height zero, poles become towers, and periodicity becomes visible as repeated terrain. Phase is omitted, so a modern renderer can add phase as hue or orientation without losing Emde's modulus-as-height idea.

Full OCR text:

<https://archive.org/stream/in.ernet.dli.2015.212842/2015.212842.Tables-Of_djvu.txt>

## Exact printed pages relevant to Borcherds / theta

The page numbers below are the **printed page numbers in the book**, not PDF indices.

| Printed page | Contents | Why it matters |
|---:|---|---|
| 41 | Chapter IV, **Theta-functions**, definition | First theta definitions and zeros. |
| 42 | Theta transformations; logarithmic derivative material begins | Quasi-periodic/transformation behavior. |
| 43 | Differential equations and **modular function** | Theta already meets differential/modular structure. |
| 45 | Numerical tables of the four theta functions and logarithmic derivatives | NIST DLMF independently cites Jahnke–Emde 1945 p.45 for these tables. |
| 90 | Beginning of elliptic functions / Jacobi amplitude material | Entry into the elliptic-function chapter used for the old relief graphics. |
| 91 | Relief of the Jacobi amplitude `am u` | Complex-function terrain immediately before `sn`. |
| 92 | **Fig. 48: relief of `sn u` for `k=0.8`** | One of the most striking surfaces; the figure caption explicitly calls `sn u` doubly periodic. |
| 93 | Reliefs of **`cn u` and `dn u`** | Companion Jacobi surfaces. |
| 94–97 | Period shifts and further Jacobi-function plots | Useful for seeing how the functions transform under quarter/half periods. |
| 98 | Jacobian zeta / transition to Weierstrass functions | Bridge between Jacobi and Weierstrass descriptions. |
| 99 | **Weierstrass `\wp` relief** (OCR labels it Fig. 55/56 imperfectly) | The image family Borcherds explicitly credits. |
| 100 | Relation of Jacobi functions to Weierstrass; **definition of sigma and zeta begins** | Direct bridge from lectures 1/3 into lecture 4. |
| 101–102 | Additional Weierstrassian functions / sigma-zeta material | Continuation of the same section. |
| 106 | Text-books and other tables for elliptic functions | Bibliographic jumping-off point inside Jahnke–Emde itself. |

### Independent page check

NIST DLMF §20.15 says explicitly that theta functions are tabulated in **Jahnke and Emde (1945, p.45)**, giving `θ_j(x,q)`, `j=1,2,3,4`, and logarithmic derivatives:

<https://dlmf.nist.gov/20.15>

DLMF bibliography entry for the edition:

<https://dlmf.nist.gov/bib/J>

## Archive BookReader leaf numbers

The scan contains front matter, so Archive's `page/n...` number is offset from the printed page. For the most useful targets:

| Printed page | Archive leaf |
|---:|---:|
| 41 | n52 |
| 45 | n56 |
| 90 | n101 |
| 91 | n102 |
| 92 | n103 |
| 93 | n104 |
| 98 | n109 |
| 99 | n110 |
| 100 | n111 |
| 102 | n113 |

Examples:

- Theta definitions, p.41: <https://archive.org/details/in.ernet.dli.2015.212842/page/n52/mode/1up>
- Theta tables, p.45: <https://archive.org/details/in.ernet.dli.2015.212842/page/n56/mode/1up>
- `sn` relief, p.92: <https://archive.org/details/in.ernet.dli.2015.212842/page/n103/mode/1up>
- Weierstrass relief, p.99: <https://archive.org/details/in.ernet.dli.2015.212842/page/n110/mode/1up>
- Sigma/zeta section begins, p.100: <https://archive.org/details/in.ernet.dli.2015.212842/page/n111/mode/1up>

## What the relevant portion develops

### pp.41–45: theta functions

The chapter introduces four classical theta functions by Fourier series in a nome, records their zeros and transformation formulas, gives logarithmic derivatives and differential relations, and connects theta constants to the elliptic modular function. It then tabulates values. This is computational mathematics in the pre-electronic sense: definitions, identities, transformations, and numerical data are kept close together.

### pp.90–98: Jacobi elliptic functions

The book moves from elliptic integrals to the inverse functions `am`, `sn`, `cn`, and `dn`. It records periods and quarter-/half-period transformations and shows the complex functions as modulus reliefs. The surfaces make the repeating zeros/poles and symmetries visible before any abstract torus/line-bundle language is introduced.

### pp.98–102: Weierstrass, sigma, zeta

The book changes coordinate systems from Jacobi to Weierstrass. It defines the Weierstrass elliptic function and its invariants/periods, gives a modulus relief, expresses Jacobi functions through Weierstrass data, then introduces the sigma and zeta functions. This printed order almost exactly mirrors the conceptual arc of Borcherds's four lectures.

## A useful historical point for this project

Emde says explicitly that the purpose of the reliefs is to let the complex function “reveal itself” as a whole instead of forcing the reader to mentally assemble disconnected formulaic properties. That is essentially the same design problem as a mathematical videogame: find a representation in which global analytic structure is perceived through manipulation rather than reconstructed from a list of identities.
